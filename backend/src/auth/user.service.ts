import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './user.entity';

@Injectable()
export class UserService {
    private users: User[] = [
        new User(1, 'admin', bcrypt.hashSync('password', 10), 'admin'),
        new User(2, 'user1', bcrypt.hashSync('password', 10), 'user'),
    ];

    async createUser(username: string, password: string, role: UserRole): Promise<User> {
        if (this.users.find(u => u.username === username)) {
            throw new BadRequestException('Username already exists');
        }

        const id = this.users.length + 1;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(id, username, hashedPassword, role);
        this.users.push(newUser);
        return newUser;
    }

    getAllUsers(): User[] {
        return this.users;
    }

    getUserById(id: number): User | null {
        return this.users.find(user => user.id === id) || null;
    }

    async updateUser(id: number, username?: string, password?: string, role?: UserRole): Promise<User> {
        const user = this.users.find(user => user.id === id);
        if (!user) throw new NotFoundException('User not found');

        if (username) user.username = username;
        if (password) user.password = await bcrypt.hash(password, 10);
        if (role) user.role = role;

        return user;
    }

    deleteUser(id: number): boolean {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) throw new NotFoundException('User not found');

        this.users.splice(index, 1);
        return true;
    }
}
