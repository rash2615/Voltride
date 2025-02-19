import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { sqliteConfig } from './infrastructure/database/sqlite-config';
import { mongoConfig } from './infrastructure/database/mongo-config';
import { ScooterController } from './interface/controllers/scooter.controller';
import { AuthModule } from './auth/auth.module';

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
