import { Injectable } from '@nestjs/common';
import { db } from '../database';

@Injectable()
export class PaymentsService {

  async findAll() {
    const [rows] = await db.query('SELECT * FROM Payments');
    return rows;
  }

  async findOne(id: string) {
    const [rows] = await db.query(
      'SELECT * FROM Payments WHERE payment_id=?',
      [id]
    );
    return rows;
  }

  async create(body: any) {
    await db.query(
      `INSERT INTO Payments
      (booking_id,amount,payment_date,
      method,status)
      VALUES(?,?,?,?,?)`,
      [
        body.booking_id,
        body.amount,
        body.payment_date,
        body.method,
        body.status
      ]
    );

    return { message: 'Payment created successfully' };
  }

  async update(id: string, body: any) {
    await db.query(
      `UPDATE Payments
       SET amount=?,status=?
       WHERE payment_id=?`,
      [
        body.amount,
        body.status,
        id
      ]
    );

    return { message: 'Payment updated successfully' };
  }

  async remove(id: string) {
    await db.query(
      'DELETE FROM Payments WHERE payment_id=?',
      [id]
    );

    return { message: 'Payment deleted successfully' };
  }
}