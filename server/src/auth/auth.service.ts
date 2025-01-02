import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Tokens } from './types';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    hashData(data: string) {
        return bcrypt.hash(data, 10);
    }

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


            return { access_token: "", refresh_token: "" }
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException("Korisnik već postoji")
                }
            }
        }

    }

    singIn() { }

    logout() { }

    refreshTokens() { }
}
