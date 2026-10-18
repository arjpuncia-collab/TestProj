import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
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

  @Put(':id')
  update(@Param('id') id: string, @Body() bookingData: any) {
    return this.bookingsService.updateBooking(+id, bookingData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.deleteBooking(+id);
  }
}