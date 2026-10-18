import { Injectable } from '@nestjs/common';

interface Flight {
  id: number;
  flight_number: string;
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  available_seats: number;
}

@Injectable()
export class FlightsService {
  private flights: Flight[] = [];

  getAllFlights() {
    return this.flights;
  }

  createFlight(flightData: any) {
    const newFlight = {
      id: this.flights.length + 1,
      ...flightData,
    };

    this.flights.push(newFlight);

    return {
      message: 'Flight created successfully',
      data: newFlight,
    };
  }

  updateFlight(id: number, flightData: Partial<Flight>) {
    const index = this.flights.findIndex((flight) => flight.id === id);

    if (index === -1) {
      return { message: 'Flight not found' };
    }

    this.flights[index] = {
      ...this.flights[index],
      ...flightData,
    };

    return this.flights[index];
  }

  deleteFlight(id: number) {
    this.flights = this.flights.filter((flight) => flight.id !== id);
    return { message: 'Flight deleted successfully' };
  }
}