import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Post('login')
async login(
  @Body() body: any,
) {
  const user =
    await this.authService.validateUser(
      body.username,
      body.password,
    );

  if (!user) {
    return {
      error:
        'Invalid username or password',
    };
  }

  return this.authService.login(
    user,
  );
}

  @Post('logout')
  logout(
    @Body() body: any,
  ) {
    return this.authService.logout(
      Number(body.userId),
    );
  }

  @Post('refresh')
  refresh(
    @Body() body: any,
  ) {
    return this.authService.refreshTokens(
      body.refresh_token,
    );
  }
}