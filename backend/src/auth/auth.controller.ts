import { Controller, Post, Get, Body, UseGuards, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import * as bcrypt from 'bcrypt';

// Types DTO pour éviter la répétition
interface AuthDto {
    username: string;
    password: string;
}

interface RegisterDto extends AuthDto {
    role: string;
}

interface RefreshDto {
    refresh_token: string;
}

@Controller()
export class AuthController {
    constructor(private authService: AuthService, private jwtService: JwtService) {}

    // Route d'accueil : permet de vérifier si le backend fonctionne bien
    @Get()
    getRoot(): string {
        return 'Bienvenue sur VoltRide API 🚀';
    }

    @Post('auth/register')
    async register(@Body() registerDto: RegisterDto) {
        if (registerDto.role !== 'admin' && registerDto.role !== 'user') {
            throw new BadRequestException("Invalid role. Allowed roles: 'admin', 'user'");
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        return this.authService.register(registerDto.username, hashedPassword, registerDto.role);
    }

    @Post('auth/login')
    async login(@Body() loginDto: AuthDto) {
        const user = await this.authService.validateUser(loginDto.username, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Post('auth/refresh')
    async refresh(@Body() body: RefreshDto) {
        try {
            const decoded = this.jwtService.verify(body.refresh_token);
            const user = await this.authService.findUserById(decoded.sub);

            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            const newAccessToken = this.jwtService.sign({
                username: decoded.username,
                sub: decoded.id,
                role: decoded.role,
            }, { expiresIn: '15m' });

            return { access_token: newAccessToken };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get('auth/admin-only')
    getAdminData() {
        return { message: 'Données accessibles uniquement aux admins.' };
    }
}
