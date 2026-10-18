import { Controller, Get } from '@nestjs/common';

@Controller('flight_crew_assignment')
export class FlightCrewAssignmentController {
  @Get()
  findAll() {
    return 'Get all flight crew assignments';
  }
}