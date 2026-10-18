import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passengersService.deletePassenger(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() passengerData: any,
  ) {
    return this.passengersService.updatePassenger(
      +id,
      passengerData,
    );
  }
}

