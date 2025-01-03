import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignInDto } from './dto';
import { AToken, Tokens } from './types';
import { AtGuard, RtGuard } from '../common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Get("check")
    @HttpCode(HttpStatus.OK)
    checkLogin(@Req() req: Request): Promise<{ isLoggin: boolean }> {
        return this.authService.checkLogin(req)
    }

    @Public()
    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() dto: AuthDto) {
        return this.authService.signUp(dto)
    }

    @Public()
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signIn(@Body() dto: SignInDto, @Res({ passthrough: true }) res: Response): Promise<AToken> {
        return this.authService.signIn(dto, res)
    }

    @Public()
    @Patch("verify/:id")
    @HttpCode(HttpStatus.OK)
    verifyUser(@Param("id") id: string): Promise<{ message: string }> {
        return this.authService.verifyUser(id);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: string, @Res({ passthrough: true }) res: Response): Promise<{ message: string }> {
        return this.authService.logout(userId, res)
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshHandler(@GetCurrentUserId() userId: string, @Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<AToken> {
        return this.authService.refreshHandler(userId, req, res)
    }
}
