export type ScooterStatus = 'available' | 'in-use' | 'maintenance';

export class Scooter {
    id: number;
    model: string;
    batteryLevel: number; // Niveau de batterie en %
    latitude: number;
    longitude: number;
    status: ScooterStatus;
    history: { latitude: number; longitude: number; timestamp: Date }[];
    reservedBy?: number; // ID de l'utilisateur qui a réservé le scooter

    constructor(id: number, model: string, batteryLevel: number, latitude: number, longitude: number, status: ScooterStatus) {
        this.id = id;
        this.model = model;
        this.batteryLevel = batteryLevel;
        this.latitude = latitude;
        this.longitude = longitude;
        this.status = status;
        this.history = [];
        this.reservedBy = undefined;
    }

    updateLocation(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.history.push({ latitude, longitude, timestamp: new Date() });
    }
}
