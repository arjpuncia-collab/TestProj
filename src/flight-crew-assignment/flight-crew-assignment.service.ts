import { Injectable } from '@nestjs/common';
import { db } from '../database';

@Injectable()
export class FlightCrewAssignmentService {

  async findAll() {
    const [rows] = await db.query(
      'SELECT * FROM Flight_Crew_Assignment'
    );

    return rows;
  }

  async findOne(id: string) {
    const [rows] = await db.query(
      `SELECT * FROM Flight_Crew_Assignment
       WHERE assignment_id=?`,
      [id]
    );

    return rows;
  }

  async create(body: any) {

    await db.query(
      `INSERT INTO Flight_Crew_Assignment
      (flight_id,crew_id)
      VALUES(?,?)`,
      [
        body.flight_id,
        body.crew_id
      ]
    );

    return {
      message: 'Assignment created successfully'
    };
  }

  async update(id: string, body: any) {

    await db.query(
      `UPDATE Flight_Crew_Assignment
       SET flight_id=?,crew_id=?
       WHERE assignment_id=?`,
      [
        body.flight_id,
        body.crew_id,
        id
      ]
    );

    return {
      message: 'Assignment updated successfully'
    };
  }

  async remove(id: string) {

    await db.query(
      'DELETE FROM Flight_Crew_Assignment WHERE assignment_id=?',
      [id]
    );

    return {
      message: 'Assignment deleted successfully'
    };
  }
}