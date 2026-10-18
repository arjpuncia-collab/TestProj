import { Injectable } from '@nestjs/common';
import { db } from '../database';

@Injectable()
export class CrewService {

  async findAll() {
    const [rows] = await db.query('SELECT * FROM Crew');
    return rows;
  }

  async findOne(id: string) {
    const [rows] = await db.query(
      'SELECT * FROM Crew WHERE crew_id=?',
      [id]
    );
    return rows;
  }

  async create(body: any) {
    await db.query(
      `INSERT INTO Crew
      (first_name,last_name,role,phone_number,email)
      VALUES(?,?,?,?,?)`,
      [
        body.first_name,
        body.last_name,
        body.role,
        body.phone_number,
        body.email
      ]
    );

    return { message: 'Crew added successfully' };
  }

  async update(id: string, body: any) {
    await db.query(
      `UPDATE Crew
       SET first_name=?,last_name=?,role=?
       WHERE crew_id=?`,
      [
        body.first_name,
        body.last_name,
        body.role,
        id
      ]
    );

    return { message: 'Crew updated successfully' };
  }

  async remove(id: string) {
    await db.query(
      'DELETE FROM Crew WHERE crew_id=?',
      [id]
    );

    return { message: 'Crew deleted successfully' };
  }
}