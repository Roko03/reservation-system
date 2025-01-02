import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signUp(@Body() dto: AuthDto) {
        return this.authService.signUp(dto)
    }

    @Post('singin')
    singIn() {
        return this.authService.singIn()
    }

    @Post('logout')
    logout() {
        return this.authService.logout()
    }

    @Post('refresh')
    refreshTokens() {
        return this.authService.refreshTokens()
    }
}
