import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignInDto } from './dto';
import { AToken, Tokens } from './types';
import { RtGuard } from '../common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signUp(dto)
    }

    @Public()
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signIn(@Body() dto: SignInDto, @Res({ passthrough: true }) res: Response): Promise<AToken> {
        return this.authService.signIn(dto, res)
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: string, @Res({ passthrough: true }) res: Response): Promise<{ message: string }> {
        return this.authService.logout(userId, res)
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(@GetCurrentUserId() userId: string, @GetCurrentUser("refreshToken") refreshToken: string) {
        return this.authService.refreshTokens(userId, refreshToken)
    }
}
