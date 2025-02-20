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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post()
    addScooter(@Body() body: { model: string; batteryLevel: number; latitude: number; longitude: number; status: 'available' | 'in-use' | 'maintenance' }) {
        return this.scooterService.addScooter(body.model, body.batteryLevel, body.latitude, body.longitude, body.status);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Put(':id')
    updateScooter(
        @Param('id') id: number,
        @Body() body: { batteryLevel?: number; latitude?: number; longitude?: number; status?: 'available' | 'in-use' | 'maintenance' }
    ) {
        return this.scooterService.updateScooter(id, body.batteryLevel, body.latitude, body.longitude, body.status);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    deleteScooter(@Param('id') id: number) {
        return this.scooterService.deleteScooter(id);
    }
}
