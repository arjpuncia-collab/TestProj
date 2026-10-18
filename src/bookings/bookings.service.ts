import { Injectable } from '@nestjs/common';
import { db } from '../database';

@Injectable()
export class BookingsService {

  async findAll() {
    const [rows] = await db.query('SELECT * FROM Bookings');
    return rows;
  }

  async findOne(id: string) {
    const [rows] = await db.query(
      'SELECT * FROM Bookings WHERE booking_id=?',
      [id]
    );
    return rows;
  }

  async create(body: any) {
    await db.query(
      `INSERT INTO Bookings
      (passenger_id,flight_id,booking_date,
      seat_number,status)
      VALUES(?,?,?,?,?)`,
      [
        body.passenger_id,
        body.flight_id,
        body.booking_date,
        body.seat_number,
        body.status
      ]
    );

    return { message: 'Booking created successfully' };
  }

  async update(id: string, body: any) {
    await db.query(
      `UPDATE Bookings
       SET seat_number=?,status=?
       WHERE booking_id=?`,
      [
        body.seat_number,
        body.status,
        id
      ]
    );

    return { message: 'Booking updated successfully' };
  }

  async remove(id: string) {
    await db.query(
      'DELETE FROM Bookings WHERE booking_id=?',
      [id]
    );

    return { message: 'Booking deleted successfully' };
  }
}