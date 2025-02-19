import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './user.entity';

@Injectable()
export class AuthService {
    private users: User[] = [
        new User(1, 'admin', bcrypt.hashSync('password', 10), 'admin'),
        new User(2, 'user1', bcrypt.hashSync('password', 10), 'user'),
    ];

    constructor(private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = this.users.find(u => u.username === username);
        if (user && (await bcrypt.compare(password, user.password))) {
            return { id: user.id, username: user.username, role: user.role };
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload, { expiresIn: '15m' }), // 🔹 Expiration du token en 15 minutes
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }), // 🔹 Refresh token valide 7 jours
        };
    }
}
