import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Scooter } from './scooter.entity';

@Injectable()
export class ScooterService {
    private scooters: Scooter[] = [
        new Scooter(1, 'VoltRide Model X', 85, 48.8566, 2.3522, 'available'),
        new Scooter(2, 'VoltRide Model Y', 60, 48.8575, 2.3510, 'in-use'),
    ];

    getAllScooters(): Scooter[] {
        return this.scooters;
    }

    getScooterById(id: number): Scooter {
        const scooter = this.scooters.find(s => s.id === id);
        if (!scooter) throw new NotFoundException('Scooter not found');
        return scooter;
    }

    addScooter(model: string, batteryLevel: number, latitude: number, longitude: number, status: 'available' | 'in-use' | 'maintenance'): Scooter {
        const id = this.scooters.length + 1;
        const newScooter = new Scooter(id, model, batteryLevel, latitude, longitude, status);
        this.scooters.push(newScooter);
        return newScooter;
    }

    updateScooter(id: number, batteryLevel?: number, latitude?: number, longitude?: number, status?: 'available' | 'in-use' | 'maintenance'): Scooter {
        const scooter = this.getScooterById(id);
        if (batteryLevel !== undefined) scooter.batteryLevel = batteryLevel;
        if (latitude !== undefined && longitude !== undefined) {
            scooter.updateLocation(latitude, longitude);
        }
        if (status) scooter.status = status;
        return scooter;
    }

    reserveScooter(id: number, userId: number): Scooter {
        const scooter = this.getScooterById(id);
        if (scooter.status !== 'available') {
            throw new BadRequestException('Scooter is not available for reservation');
        }
        scooter.status = 'in-use';
        scooter.reservedBy = userId;
        return scooter;
    }

    releaseScooter(id: number, userId: number): Scooter {
        const scooter = this.getScooterById(id);
        if (scooter.reservedBy !== userId) {
            throw new BadRequestException('Scooter was not reserved by this user');
        }
        scooter.status = 'available';
        scooter.reservedBy = undefined;
        return scooter;
    }
}
