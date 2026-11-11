import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(userData: {
    username: string;
    password: string;
  }) {
    if (!userData.username || !userData.password) {
      throw new UnauthorizedException(
        'Username and password are required',
      );
    }

    return await this.usersService.createUser({
      username: userData.username,
      password: userData.password,
    });
  }

  async validateUser(
    username: string,
    pass: string,
  ) {
    const user =
      await this.usersService.findByUsername(
        username,
      );

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(
      pass,
      user.password,
    );

    if (!valid) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      role: user.role,
    };
  }

  async login(user: {
    id: number;
    username: string;
    role: string;
  }) {
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    const accessToken =
      this.jwtService.sign(payload);

    const refreshSecret =
      process.env.JWT_REFRESH_TOKEN_SECRET ||
      'refresh_secret';
    const refreshExpiresIn =
      (process.env.REFRESH_TOKEN_EXPIRES_IN as
        jwt.SignOptions['expiresIn']) || '7d';

    const refreshToken = jwt.sign(payload, refreshSecret, {
      expiresIn: refreshExpiresIn,
    });

    await this.usersService.setRefreshToken(
      user.id,
      refreshToken,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(userId: number) {
    await this.usersService.setRefreshToken(
      userId,
      null,
    );

    return {
      ok: true,
    };
  }

  async refreshTokens(
    refreshToken: string,
  ) {
    try {
      const decoded: any =
        jwt.verify(
          refreshToken,
          process.env
            .JWT_REFRESH_TOKEN_SECRET ||
            'refresh_secret',
        );

      const user =
        await this.usersService.findById(
          decoded.sub,
        );

      if (!user) {
        throw new UnauthorizedException(
          'Invalid refresh token',
        );
      }

      const found =
        await this.usersService.findByRefreshToken(
          refreshToken,
        );

      if (!found) {
        throw new UnauthorizedException(
          'Invalid token',
        );
      }

      const payload = {
        sub: found.id,
        username: found.username,
        role: found.role,
      };

      const accessToken =
        this.jwtService.sign(payload);

      const refreshSecret =
        process.env.JWT_REFRESH_TOKEN_SECRET ||
        'refresh_secret';
      const refreshExpiresIn =
        (process.env.REFRESH_TOKEN_EXPIRES_IN as
          jwt.SignOptions['expiresIn']) || '7d';

      const newRefresh = jwt.sign(payload, refreshSecret, {
        expiresIn: refreshExpiresIn,
      });

      await this.usersService.setRefreshToken(
        found.id,
        newRefresh,
      );

      return {
        accessToken,
        refreshToken: newRefresh,
      };
    } catch {
      throw new UnauthorizedException(
        'Could not refresh tokens',
      );
    }
  }
}