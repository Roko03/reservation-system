import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignInDto } from './dto';
import { Tokens } from './types';

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

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout() {
        // return this.authService.logout()
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens() {
        return this.authService.refreshTokens()
    }
}
