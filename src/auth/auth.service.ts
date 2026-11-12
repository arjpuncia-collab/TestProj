import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(body: any) {
    const existingUser =
      await this.usersService.findByUsername(
        body.username,
      );

    if (existingUser) {
      throw new UnauthorizedException(
        'Username already exists',
      );
    }

    return this.usersService.createUser(body);
  }

  async validateUser(
    username: string,
    pass: string,
  ) {
    const user =
      await this.usersService.findByUsername(
        username,
      );

    console.log('LOGIN USER:', user);

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(
      pass,
      user.password,
    );

    console.log('PASSWORD MATCH:', valid);

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

  const refreshToken =
    this.jwtService.sign(payload);

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

  async logout(userId: number) {
    await this.usersService.setRefreshToken(
      userId,
      null,
    );

    return {
      message: 'Logged out successfully',
    };
  }

  async refreshTokens(
    refreshToken: string,
  ) {
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

    const accessToken =
      this.jwtService.sign(payload);

    const newRefreshToken =
      this.jwtService.sign(payload);

    await this.usersService.setRefreshToken(
      found.id,
      newRefreshToken,
    );

    return {
      accessToken,
      refreshToken:
        newRefreshToken,
    };
  }
}