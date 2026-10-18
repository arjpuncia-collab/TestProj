import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FlightsService } from './flights.service';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Get()
  findAll() {
    return this.flightsService.getAllFlights();
  }

  @Post()
  create(@Body() flightData: any) {
    return this.flightsService.createFlight(flightData as any);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() flightData: any) {
    return this.flightsService.updateFlight(+id, flightData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flightsService.deleteFlight(+id);
  }
}