import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ScooterService } from './scooter.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('scooters')
export class ScooterController {
    constructor(private scooterService: ScooterService) {}

    @Get()
    getAllScooters() {
        return this.scooterService.getAllScooters();
    }

    @Get(':id')
    getScooter(@Param('id') id: number) {
        return this.scooterService.getScooterById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/location')
    updateScooterLocation(
        @Param('id') id: number,
        @Body() body: { latitude: number; longitude: number }
    ) {
        return this.scooterService.updateScooter(id, undefined, body.latitude, body.longitude);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/reserve')
    reserveScooter(@Param('id') id: number, @Body() body: { userId: number }) {
        return this.scooterService.reserveScooter(id, body.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/release')
    releaseScooter(@Param('id') id: number, @Body() body: { userId: number }) {
        return this.scooterService.releaseScooter(id, body.userId);
    }
}
