import { Controller, Get, Post, Body } from '@nestjs/common';
import { FlightCrewAssignmentService } from './flight-crew-assignment.service';

@Controller('flight-crew-assignment')
export class FlightCrewAssignmentController {
  constructor(
    private readonly assignmentService: FlightCrewAssignmentService,
  ) {}

  @Get()
  findAll() {
    return this.assignmentService.getAllAssignments();
  }

  @Post()
  create(@Body() assignmentData: any) {
    return this.assignmentService.createAssignment(assignmentData);
  }
}