import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, SignInDto } from './dto';
import * as bcrypt from 'bcrypt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

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

            const tokens = await this.getTokens(user.id, user.email);

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

    async signIn(dto: SignInDto): Promise<Tokens> {

        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if (!user) throw new ForbiddenException("Korisnik ne postoji");

        const passwordMatch = await bcrypt.compare(dto.password, user.password);

        if (!passwordMatch) throw new ForbiddenException("Netočna šifra");

        const tokens = await this.getTokens(user.id, user.email);

        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens;
    }

    async logout(userId: string) {
        await this.prisma.refreshToken.deleteMany({
            where: {
                userId: userId,
            }
        })
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
                userId
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        if (!refreshToken) throw new ForbiddenException("Access Denied")

        const rtMatch = await bcrypt.compare(rt, refreshToken.hashedRt);

        if (!rtMatch) throw new ForbiddenException("Token je istekao")

        const tokens = await this.getTokens(user.id, user.email);

        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens
    }

    hashData(data: string) {
        return bcrypt.hash(data, 10);
    }

    async getTokens(userId: string, email: string): Promise<Tokens> {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email,
            }, {
                expiresIn: 60 * 15,
                secret: "at-secret"
            }),
            this.jwtService.signAsync({
                sub: userId,
                email,
            }, {
                expiresIn: 60 * 60 * 24 * 7,
                secret: "rt-secret"
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
