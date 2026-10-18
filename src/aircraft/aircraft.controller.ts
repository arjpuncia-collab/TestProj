import { Controller, Get, Post, Body } from '@nestjs/common';
import { AircraftService } from './aircraft.service';

@Controller('aircraft')
export class AircraftController {
  constructor(private readonly aircraftService: AircraftService) {}

  @Get()
  findAll() {
    return this.aircraftService.getAllAircrafts();
  }

  @Post()
  create(@Body() aircraftData: any) {
    return this.aircraftService.createAircraft(aircraftData);
  }
}