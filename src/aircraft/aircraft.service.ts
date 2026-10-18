import { Injectable } from '@nestjs/common';
import { db } from '../database';

@Injectable()
export class AircraftService {

  async findAll() {
    const [rows] = await db.query('SELECT * FROM Aircrafts');
    return rows;
  }

  async findOne(id: string) {
    const [rows] = await db.query(
      'SELECT * FROM Aircrafts WHERE aircraft_id=?',
      [id]
    );
    return rows;
  }

  async create(body: any) {
    await db.query(
      `INSERT INTO Aircrafts
      (model,capacity,manufacturer,registration_number)
      VALUES(?,?,?,?)`,
      [
        body.model,
        body.capacity,
        body.manufacturer,
        body.registration_number
      ]
    );

    return { message: 'Aircraft added successfully' };
  }

  async update(id: string, body: any) {
    await db.query(
      `UPDATE Aircrafts
       SET model=?,capacity=?,manufacturer=?
       WHERE aircraft_id=?`,
      [
        body.model,
        body.capacity,
        body.manufacturer,
        id
      ]
    );

    return { message: 'Aircraft updated successfully' };
  }

  async remove(id: string) {
    await db.query(
      'DELETE FROM Aircrafts WHERE aircraft_id=?',
      [id]
    );

    return { message: 'Aircraft deleted successfully' };
  }
}