import { Controller, Get, Post, Body } from '@nestjs/common';
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
  }}