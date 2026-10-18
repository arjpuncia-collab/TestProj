import { Injectable } from '@nestjs/common';
import { db } from '../database';

@Injectable()
export class PassengersService {

  async findAll() {
    const [rows] = await db.query(
      'SELECT * FROM Passengers'
    );

    return rows;
  }

  async findOne(id: string) {
    const [rows] = await db.query(
      'SELECT * FROM Passengers WHERE passenger_id=?',
      [id]
    );

    return rows;
  }

  async create(body: any) {

    await db.query(
      `INSERT INTO Passengers
      (first_name,last_name,passport_number,nationality,phone_number,email)
      VALUES(?,?,?,?,?,?)`,
      [
        body.first_name,
        body.last_name,
        body.passport_number,
        body.nationality,
        body.phone_number,
        body.email
      ]
    );

    return {
      message: 'Passenger created successfully'
    };
  }

  async update(id: string, body: any) {

    await db.query(
      `UPDATE Passengers
      SET first_name=?,
      last_name=?,
      nationality=?,
      phone_number=?,
      email=?
      WHERE passenger_id=?`,
      [
        body.first_name,
        body.last_name,
        body.nationality,
        body.phone_number,
        body.email,
        id
      ]
    );

    return {
      message: 'Passenger updated successfully'
    };
  }

  async remove(id: string) {

    await db.query(
      'DELETE FROM Passengers WHERE passenger_id=?',
      [id]
    );

    return {
      message: 'Passenger deleted successfully'
    };
  }
}