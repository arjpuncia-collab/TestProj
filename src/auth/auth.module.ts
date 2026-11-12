import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,

    JwtModule.register({
      secret:
        process.env.JWT_ACCESS_TOKEN_SECRET ||
        'your_access_secret_here',

      signOptions: {
        expiresIn: '15m',
      },
    }),
  ],

  controllers: [AuthController],

  providers: [AuthService],

  exports: [AuthService],
})
export class AuthModule {}