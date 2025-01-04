import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, SignInDto } from './dto';
import * as bcrypt from 'bcrypt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AToken, GoogleAuthData, JwtPayload, Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService, private config: ConfigService) { }

    async checkLogin(req: Request): Promise<{ isLoggin: boolean }> {

        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            return { isLoggin: false }
        }

        return { isLoggin: true }
    }

    async signUp(dto: AuthDto) {

        const passwordHash = await this.hashData(dto.password)

        try {
            const user = await this.prisma.user.create({
                data: {
                    firstname: dto.firstName,
                    lastName: dto.lastName,
                    email: dto.email,
                    password: passwordHash,
                    phoneNumber: dto.phoneNumber
                }
            })

            const token = await this.prisma.token.create({
                data: {
                    userId: user.id
                }
            })

            return { token: token.tokenValue }
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException("Korisnik već postoji")
                }
            }
        }
    }

    async signIn(dto: SignInDto, res: Response): Promise<AToken> {

        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if (!user) throw new ForbiddenException("Korisnik ne postoji");
        if (user.userAgent !== "regular") throw new UnauthorizedException("Korisnik je registriran preko Googla")

        const passwordMatch = await bcrypt.compare(dto.password, user.password);

        if (!passwordMatch) throw new ForbiddenException("Netočna šifra");

        if (!user.isVerified) throw new UnauthorizedException("Korisnik nije verificiran");


        const tokens = await this.getTokens(user.id, user.email, user.role);

        res.cookie("refreshToken", tokens.refresh_token, {
            sameSite: "none",
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: this.config.get("REFRESH_COOKIE_LIFETIME")
        });

        return { access_token: tokens.access_token };
    }

    async verifyUser(id: string): Promise<{ message: string }> {
        const verifyToken = await this.prisma.token.findFirst({
            where: {
                tokenValue: id
            }
        })

        if (!verifyToken) throw new ForbiddenException("Verificirani token ne postoji");

        const user = await this.prisma.user.update({
            where: {
                id: verifyToken.userId
            },
            data: {
                isVerified: true
            }
        })

        if (!user) throw new ForbiddenException("Neuspjela verifikacija")

        await this.prisma.token.delete({
            where: {
                id: verifyToken.id
            }
        })

        return { message: "Korisnik je verificiran" }
    }

    async googleLogin(res: Response, req: Request): Promise<AToken> {
        if (!req.user) throw new ForbiddenException("Korisnik ne postoji")

        const googleData = req.user as GoogleAuthData

        let user = null;

        user = await this.prisma.user.findUnique({
            where: {
                email: googleData.email
            }
        })

        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    firstname: googleData.firstName,
                    lastName: googleData.lastName,
                    email: googleData.email,
                    profileImage: googleData.profileImage,
                    isVerified: googleData.isVerified,
                    userAgent: "google"
                }
            }).catch(error => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === "P2002") {
                        throw new ForbiddenException("Korisnik već postoji")
                    }
                }
            })
        }


        const tokens = await this.getTokens(user.id, user.email, user.role);

        res.cookie("refreshToken", tokens.refresh_token, {
            sameSite: "none",
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: this.config.get("REFRESH_COOKIE_LIFETIME")
        });

        return { access_token: tokens.access_token };
    }

    async logout(userId: string, res: Response): Promise<{ message: string }> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) throw new ForbiddenException("Korisnik ne postoji")

        res.cookie("refreshToken", "", {
            sameSite: "none",
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0
        })

        res.clearCookie("refreshToken")

        return { message: "Korisnik uspješno odjavljen" }
    }

    async refreshHandler(userId: string, req: Request, res: Response): Promise<AToken> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) throw new ForbiddenException("Access Denied")

        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            res.cookie("refreshToken", "", {
                sameSite: "none",
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 0
            })
            throw new UnauthorizedException("Potreban je token")
        }

        const payload = await this.jwtService.verify(refreshToken, {
            secret: this.config.get("REFRESH_TOKEN_SECRET")
        }) as JwtPayload

        if (!payload) {
            res.cookie("refreshToken", "", {
                sameSite: "none",
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 0
            })
            throw new UnauthorizedException("Token je istekao ili ne postoji")
        }

        const accessToken = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
            role: user.role
        }, {
            expiresIn: this.config.get("ACCESS_TOKEN_LIFETIME"),
            secret: this.config.get("ACCESS_TOKEN_SECRET")
        })

        return { access_token: accessToken }
    }

    hashData(data: string) {
        return bcrypt.hash(data, 10);
    }

    async getTokens(userId: string, email: string, role: string): Promise<Tokens> {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email,
                role
            }, {
                expiresIn: this.config.get("ACCESS_TOKEN_LIFETIME"),
                secret: this.config.get("ACCESS_TOKEN_SECRET")
            }),
            this.jwtService.signAsync({
                sub: userId,
                email,
                role
            }, {
                expiresIn: this.config.get("REFRESH_TOKEN_LIFETIME"),
                secret: this.config.get("REFRESH_TOKEN_SECRET")
            })
        ])

        return { access_token: at, refresh_token: rt }
    }
}
