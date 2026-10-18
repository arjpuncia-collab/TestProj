import { Injectable } from '@nestjs/common';

interface Flight {
  flight_id: number;
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

  createFlight(flightData: Flight) {
    this.flights.push(flightData);

    return {
      message: 'Flight created successfully',
      data: flightData,
    };
  }

  updateFlight(id: number, flightData: Partial<Flight>) {
    const index = this.flights.findIndex((flight) => flight.flight_id === id);

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
    this.flights = this.flights.filter((flight) => flight.flight_id !== id);
    return { message: 'Flight deleted successfully' };
  }
}