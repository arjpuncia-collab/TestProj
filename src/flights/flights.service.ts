import { Injectable } from '@nestjs/common';
import { db } from '../database';

@Injectable()
export class FlightsService {

  async findAll() {
    const [rows] = await db.query('SELECT * FROM Flights');
    return rows;
  }

  async findOne(id: string) {
    const [rows] = await db.query(
      'SELECT * FROM Flights WHERE flight_id=?',
      [id]
    );
    return rows;
  }

  async create(body: any) {
    await db.query(
      `INSERT INTO Flights
      (flight_number,aircraft_id,origin,destination,
      departure_time,arrival_time,status)
      VALUES(?,?,?,?,?,?,?)`,
      [
        body.flight_number,
        body.aircraft_id,
        body.origin,
        body.destination,
        body.departure_time,
        body.arrival_time,
        body.status
      ]
    );

    return { message: 'Flight created successfully' };
  }

  async update(id: string, body: any) {
    await db.query(
      `UPDATE Flights
       SET flight_number=?,origin=?,destination=?,status=?
       WHERE flight_id=?`,
      [
        body.flight_number,
        body.origin,
        body.destination,
        body.status,
        id
      ]
    );

    return { message: 'Flight updated successfully' };
  }

  async remove(id: string) {
    await db.query(
      'DELETE FROM Flights WHERE flight_id=?',
      [id]
    );

    return { message: 'Flight deleted successfully' };
  }
}