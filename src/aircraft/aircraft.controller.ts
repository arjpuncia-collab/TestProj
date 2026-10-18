import { Controller, Get } from '@nestjs/common';

@Controller('aircrafts')
export class AircraftsController {
  @Get()
  findAll() {
    return 'Get all aircrafts';
  }
}