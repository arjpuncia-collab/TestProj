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

  updateBooking(id: number, bookingData: Partial<Booking>) {
    const index = this.bookings.findIndex(booking => booking.booking_id === id);

    if (index === -1) {
      return { message: 'Booking not found' };
    }

    this.bookings[index] = {
      ...this.bookings[index],
      ...bookingData,
    };

    return this.bookings[index];
  }

  deleteBooking(id: number) {
    this.bookings = this.bookings.filter(booking => booking.booking_id !== id);

    return { message: 'Booking deleted successfully' };
  }
}