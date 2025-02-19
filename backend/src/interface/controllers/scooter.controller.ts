import { Controller, Get, Post, Body } from '@nestjs/common';
import { ManageScooterUseCase } from '../../application/manageScooter.usecase';
import { Scooter } from '../../domain/scooter.entity';

@Controller('scooters')  // <<< Assure-toi que ce soit bien écrit ici
export class ScooterController {
    private manageScooterUseCase = new ManageScooterUseCase();

    @Post()
    addScooter(@Body() scooter: Scooter) {
        this.manageScooterUseCase.addScooter(scooter);
        return { message: 'Scooter ajouté avec succès' };
    }

    @Get()
    getAllScooters() {
        return this.manageScooterUseCase.getAllScooters();
    }
}
