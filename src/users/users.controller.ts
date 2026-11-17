import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  createUser(@Body() body: any) {
    return this.usersService.createUser(body);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.usersService.updateUser(
      Number(id),
      body,
    );
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(
      Number(id),
    );
  }
}