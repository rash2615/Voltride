import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Scooter } from '../../domain/scooter.entity';

export const sqliteConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [Scooter],
    synchronize: true, // Auto-génère la DB (à désactiver en prod)
};
