import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { db } from '../database';

@Controller('passengers')
export class PassengersController {

  @Get()
  async findAll() {
    const [rows] = await db.query(
      'SELECT * FROM Passengers'
    );

    return rows;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {

    const [rows] = await db.query(
      'SELECT * FROM Passengers WHERE passenger_id=?',
      [id]
    );

    return rows;
  }

  @Post()
  async create(@Body() body: any) {

    const {
      first_name,
      last_name,
      passport_number,
      nationality,
      phone_number,
      email,
    } = body;

    await db.query(
      `INSERT INTO Passengers
      (first_name,last_name,passport_number,nationality,phone_number,email)
      VALUES (?,?,?,?,?,?)`,
      [
        first_name,
        last_name,
        passport_number,
        nationality,
        phone_number,
        email,
      ]
    );

    return {
      message: 'Passenger added successfully'
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: any
  ) {

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
        id,
      ]
    );

    return {
      message: 'Passenger updated'
    };
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string
  ) {

    await db.query(
      'DELETE FROM Passengers WHERE passenger_id=?',
      [id]
    );

    return {
      message: 'Passenger deleted'
    };
  }
}