import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
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

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() assignmentData: any,
  ) {
    return this.assignmentService.updateAssignment(
      +id,
      assignmentData,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentService.deleteAssignment(+id);
  }
}