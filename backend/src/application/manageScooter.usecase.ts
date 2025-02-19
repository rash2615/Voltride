import { Scooter } from '../domain/scooter.entity';

export class ManageScooterUseCase {
    private scooters: Scooter[] = [];

    addScooter(scooter: Scooter) {
        this.scooters.push(scooter);
    }

    getAllScooters(): Scooter[] {
        return this.scooters;
    }
}
