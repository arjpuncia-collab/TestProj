import { Injectable } from '@nestjs/common';

interface Booking {
  booking_id: number;
  passenger_id: number;
  flight_id: number;
  booking_date: string;
  status: string;
}

@Injectable()
export class BookingsService {
  private bookings: Booking[] = [];

  getAllBookings() {
    return this.bookings;
  }

  createBooking(bookingData: Booking) {
    this.bookings.push(bookingData);

    return {
      message: 'Booking created successfully',
      data: bookingData,
    };
  }
}