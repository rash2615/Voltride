import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { sqliteConfig } from './infrastructure/database/sqlite-config';
import { mongoConfig } from './infrastructure/database/mongo-config';
import { AuthModule } from './auth/auth.module';
import { ScooterService } from './scooters/scooter.service';
import { ScooterController } from './scooters/scooter.controller';

const isSQL = process.env.DB_TYPE === 'SQL';

@Module({
    imports: [
        isSQL
            ? TypeOrmModule.forRoot(sqliteConfig)
            : MongooseModule.forRoot(mongoConfig.uri),
        AuthModule, // ✅ Correction de l'import d'AuthModule
    ],
    controllers: [ScooterController],
    providers: [],
})
export class AppModule {}
