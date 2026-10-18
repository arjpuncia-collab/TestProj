import { Injectable } from '@nestjs/common';

interface FlightCrewAssignment {
  id: number;
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

  createAssignment(assignmentData: any) {
    const newAssignment = {
      id: this.assignments.length + 1,
      ...assignmentData,
    };

    this.assignments.push(newAssignment);

    return {
      message: 'Assignment created successfully',
      data: newAssignment,
    };
  }

  updateAssignment(id: number, assignmentData: any) {
    const index = this.assignments.findIndex(
      assignment => assignment.id === id,
    );

    if (index === -1) {
      return {
        message: 'Assignment not found',
      };
    }

    this.assignments[index] = {
      ...this.assignments[index],
      ...assignmentData,
    };

    return {
      message: 'Assignment updated successfully',
      data: this.assignments[index],
    };
  }

  deleteAssignment(id: number) {
    this.assignments = this.assignments.filter(
      assignment => assignment.id !== id,
    );

    return {
      message: 'Assignment deleted successfully',
    };
  }
}