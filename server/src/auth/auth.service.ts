import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, SignInDto } from './dto';
import * as bcrypt from 'bcrypt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AToken, Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService, private config: ConfigService) { }

    async signUp(dto: AuthDto): Promise<Tokens> {

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

            const tokens = await this.getTokens(user.id, user.email, user.role);

            await this.updateRtHash(user.id, tokens.refresh_token);

            return tokens
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

        const passwordMatch = await bcrypt.compare(dto.password, user.password);

        if (!passwordMatch) throw new ForbiddenException("Netočna šifra");

        if (!user.isVerified) throw new UnauthorizedException("Korisnik nije verificiran");

        const tokens = await this.getTokens(user.id, user.email, user.role);

        res.cookie("refreshToken", tokens.refresh_token, { sameSite: "none", httpOnly: true, maxAge: 60 * 60 * 24 });

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
            maxAge: 0
        })

        res.clearCookie("refreshToken")

        return { message: "Korisnik uspješno odjavljen" }
    }

    async refreshTokens(userId: string, rt: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) throw new ForbiddenException("Access Denied")

        const refreshToken = await this.prisma.refreshToken.findFirst({
            where: {
                userId: user.id
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        if (!refreshToken) throw new ForbiddenException("Access Denied")

        const rtMatch = await bcrypt.compare(rt, refreshToken.hashedRt);

        if (!rtMatch) throw new ForbiddenException("Token je istekao")

        const tokens = await this.getTokens(user.id, user.email, user.role);

        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens
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
                expiresIn: 60 * 15,
                secret: this.config.get("ACCESS_TOKEN_SECRET")
            }),
            this.jwtService.signAsync({
                sub: userId,
                email,
                role
            }, {
                expiresIn: 60 * 60 * 24 * 7,
                secret: this.config.get("REFRESH_TOKEN_SECRET")
            })
        ])

        return { access_token: at, refresh_token: rt }
    }

    async updateRtHash(userId: string, rt: string) {
        const hash = await this.hashData(rt);

        await this.prisma.refreshToken.create({
            data: {
                userId: userId,
                hashedRt: hash,
            }
        });
    }
}
