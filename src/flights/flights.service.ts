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
}