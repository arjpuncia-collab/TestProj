import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  findAll() {
    return this.bookingsService.getAllBookings();
  }

  @Post()
  create(@Body() bookingData: any) {
    return this.bookingsService.createBooking(bookingData);
  }
}