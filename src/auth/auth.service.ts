
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
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

  // REGISTER
  async register(userData: {
    username: string;
    password: string;
  }) {
    if (!userData.username?.trim() || !userData.password) {
      throw new BadRequestException(
        'Username and password are required',
      );
    }

    return this.usersService.createUser({
      username: userData.username.trim(),
      password: userData.password,
    });
  }

  // VALIDATE LOGIN
  async validateUser(
    username: string,
    pass: string,
  ) {
    const user = await this.usersService.findByUsername(
      username,
    );

    if (!user) {
      return null;
    }

    if (!user.password) {
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

  // LOGIN
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

    const accessToken = this.jwtService.sign(payload);

    const refreshSecret =
      process.env.JWT_REFRESH_TOKEN_SECRET;

    if (!refreshSecret) {
      throw new Error(
        'JWT_REFRESH_TOKEN_SECRET is not configured',
      );
    }

    const refreshExpiresIn =
      (process.env.REFRESH_TOKEN_EXPIRES_IN as
        jwt.SignOptions['expiresIn']) || '7d';

    const refreshToken = jwt.sign(
      payload,
      refreshSecret,
      {
        expiresIn: refreshExpiresIn,
      },
    );

    await this.usersService.setRefreshToken(
      user.id,
      refreshToken,
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }

  // LOGOUT
  async logout(userId: number) {
    await this.usersService.setRefreshToken(
      userId,
      null,
    );

    return {
      ok: true,
      message: 'Logged out successfully',
    };
  }

  // REFRESH TOKENS
  async refreshTokens(refreshToken: string) {
    try {
      if (!refreshToken) {
        throw new UnauthorizedException(
          'Refresh token is required',
        );
      }

      const refreshSecret =
        process.env.JWT_REFRESH_TOKEN_SECRET;

      if (!refreshSecret) {
        throw new Error(
          'JWT_REFRESH_TOKEN_SECRET is not configured',
        );
      }

      const decoded: any = jwt.verify(
        refreshToken,
        refreshSecret,
      );

      const user = await this.usersService.findById(
        Number(decoded.sub),
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
          'Invalid refresh token',
        );
      }

      const payload = {
        sub: found.id,
        username: found.username,
        role: found.role,
      };

      const accessToken = this.jwtService.sign(payload);

      const refreshExpiresIn =
        (process.env.REFRESH_TOKEN_EXPIRES_IN as
          jwt.SignOptions['expiresIn']) || '7d';

      const newRefreshToken = jwt.sign(
        payload,
        refreshSecret,
        {
          expiresIn: refreshExpiresIn,
        },
      );

      await this.usersService.setRefreshToken(
        found.id,
        newRefreshToken,
      );

      return {
        accessToken,
        refreshToken: newRefreshToken,
      };
    } catch {
      throw new UnauthorizedException(
        'Could not refresh tokens',
      );
    }
  }
}
