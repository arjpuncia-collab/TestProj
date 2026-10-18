import { Injectable } from '@nestjs/common';

interface Booking {
  id: number;
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

  createBooking(bookingData: any) {
    const newBooking = {
      id: this.bookings.length + 1,
      ...bookingData,
    };

    this.bookings.push(newBooking);

    return {
      message: 'Booking created successfully',
      data: newBooking,
    };
  }

  getBookingById(id: number) {
    return this.bookings.find(
      booking => booking.id === id,
    );
  }

  updateBooking(id: number, bookingData: any) {
    const index = this.bookings.findIndex(
      booking => booking.id === id,
    );

    if (index === -1) {
      return { message: 'Booking not found' };
    }

    this.bookings[index] = {
      ...this.bookings[index],
      ...bookingData,
    };

    return {
      message: 'Booking updated successfully',
      data: this.bookings[index],
    };
  }

  deleteBooking(id: number) {
    this.bookings = this.bookings.filter(
      booking => booking.id !== id,
    );

    return {
      message: 'Booking deleted successfully',
    };
  }
}