import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignInDto } from './dto';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { Request } from "express"
import { AtGuard, RtGuard } from '../common/guards';
import { GetCurrentUser, GetCurrentUserId } from '../common/decorators';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signUp(dto)
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signIn(@Body() dto: SignInDto): Promise<Tokens> {
        return this.authService.signIn(dto)
    }

    @UseGuards(AtGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: string) {
        return this.authService.logout(userId)
    }

    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(@GetCurrentUserId() userId: string, @GetCurrentUser("refreshToken") refreshToken: string) {
        return this.authService.refreshTokens(userId, refreshToken)
    }
}
