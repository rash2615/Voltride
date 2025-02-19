import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { UserRole } from './user.entity';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getUser(@Param('id') id: number) {
        return this.userService.getUserById(id);
    }

    @Post()
    async createUser(@Body() body: { username: string; password: string; role: UserRole }) {
        return this.userService.createUser(body.username, body.password, body.role);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Put(':id')
    async updateUser(
        @Param('id') id: number,
        @Body() body: { username?: string; password?: string; role?: UserRole }
    ) {
        return this.userService.updateUser(id, body.username, body.password, body.role);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.userService.deleteUser(id);
    }
}
