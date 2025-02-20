import { Injectable, NotFoundException } from '@nestjs/common';
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
        if (latitude !== undefined) scooter.latitude = latitude;
        if (longitude !== undefined) scooter.longitude = longitude;
        if (status) scooter.status = status;
        return scooter;
    }

    deleteScooter(id: number): boolean {
        const index = this.scooters.findIndex(s => s.id === id);
        if (index === -1) throw new NotFoundException('Scooter not found');
        this.scooters.splice(index, 1);
        return true;
    }
}
