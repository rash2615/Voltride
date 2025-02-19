import { Controller, Post, Get, Body, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private jwtService: JwtService) {}

    @Post('login')
    async login(@Body() loginDto: { username: string; password: string }) {
        return this.authService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin') // 🔹 Seuls les admins peuvent accéder à cette route
    @Get('admin-only')
    getAdminData() {
        return { message: 'Données accessibles uniquement aux admins.' };
    }

    // 🔹 NOUVELLE ROUTE POUR RAFRAÎCHIR LE TOKEN
    @Post('refresh')
    async refresh(@Body() body: { refresh_token: string }) {
        try {
            const decoded = this.jwtService.verify(body.refresh_token);
            const newAccessToken = this.jwtService.sign({
                username: decoded.username,
                sub: decoded.id,
                role: decoded.role,
            }, { expiresIn: '15m' }); // 🔹 Nouveau token pour 15 min

            return { access_token: newAccessToken };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}
