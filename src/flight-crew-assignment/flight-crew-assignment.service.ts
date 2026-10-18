import { Injectable } from '@nestjs/common';

interface FlightCrewAssignment {
  assignment_id: number;
  flight_id: number;
  crew_id: number;
  role: string;
}

@Injectable()
export class FlightCrewAssignmentService {
  private assignments: FlightCrewAssignment[] = [];

  getAllAssignments() {
    return this.assignments;
  }

  createAssignment(assignmentData: FlightCrewAssignment) {
    this.assignments.push(assignmentData);

    return {
      message: 'Crew assigned to flight successfully',
      data: assignmentData,
    };
  }
}