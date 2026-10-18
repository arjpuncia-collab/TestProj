import { Controller, Get } from '@nestjs/common';

@Controller('crew')
export class CrewController {
  @Get()
  findAll() {
    return 'Get all crew';
  }
}