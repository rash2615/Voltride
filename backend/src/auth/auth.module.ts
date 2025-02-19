import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY', // ⚠️ Stocker cela dans un fichier .env en production
      signOptions: { expiresIn: '1h' }, // Durée de validité du token
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, JwtStrategy, JwtService, UserService],
  exports: [AuthService, UserService],
})
export class AuthModule {}
