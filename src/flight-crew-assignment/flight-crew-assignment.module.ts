import { Module } from '@nestjs/common';
import { FlightCrewAssignmentController } from './flight-crew-assignment.controller';
import { FlightCrewAssignmentService } from './flight-crew-assignment.service';

@Module({
  controllers: [FlightCrewAssignmentController],
  providers: [FlightCrewAssignmentService],
})
export class FlightCrewAssignmentModule {}