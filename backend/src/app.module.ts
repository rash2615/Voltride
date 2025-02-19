import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { sqliteConfig } from './infrastructure/database/sqlite-config';
import { mongoConfig } from './infrastructure/database/mongo-config';
import { ScooterController } from './interface/controllers/scooter.controller';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller'; // ✅ Ajout du contrôleur principal

const isSQL = process.env.DB_TYPE === 'SQL';

@Module({
    imports: [
        isSQL
            ? TypeOrmModule.forRoot(sqliteConfig)
            : MongooseModule.forRoot(mongoConfig.uri),
        AuthModule,
    ],
    controllers: [
        AppController, // ✅ Ajout du contrôleur principal
        ScooterController,
    ],
    providers: [],
})
export class AppModule {}
