import { Controller, Get } from '@nestjs/common';

@Controller('flight_crew_assignment')
export class FlightCrewAssignmentController {
  @Get()
findAll() {
  return [
    {
      assignment_id: 1,
      flight_id: 1,
      crew_id: 1
    }
  ];
}}