export class Scooter {
    id: number;
    model: string;
    batteryLevel: number; // Niveau de batterie en %
    latitude: number;
    longitude: number;
    status: 'available' | 'in-use' | 'maintenance'; // État du scooter

    constructor(id: number, model: string, batteryLevel: number, latitude: number, longitude: number, status: 'available' | 'in-use' | 'maintenance') {
        this.id = id;
        this.model = model;
        this.batteryLevel = batteryLevel;
        this.latitude = latitude;
        this.longitude = longitude;
        this.status = status;
    }
}
