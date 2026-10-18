import { Controller, Get, Post, Body } from '@nestjs/common';
import { PassengersService } from './passengers.service';

@Controller('passengers')
export class PassengersController {
  constructor(private readonly passengersService: PassengersService) {}

  @Get()
  findAll() {
    return this.passengersService.getAllPassengers();
  }

  @Post()
  create(@Body() passengerData: any) {
    return this.passengersService.createPassenger(passengerData);
  }
}