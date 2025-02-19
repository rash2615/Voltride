import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get('/')
    getRoot(): string {
        return 'Bienvenue sur VoltRide API 🚀';
    }
}
