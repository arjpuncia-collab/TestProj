import { Injectable } from '@nestjs/common';

interface Passenger {
  first_name: string;
  last_name: string;
  passport_number: string;
  nationality: string;
  phone_number: string;
  email: string;
}

@Injectable()
export class PassengersService {
  private passengers: Passenger[] = [];

  getAllPassengers() {
    return this.passengers;
  }

  createPassenger(passengerData: Passenger) {
    this.passengers.push(passengerData);

    return {
      message: 'Passenger created successfully',
      data: passengerData,
    };
  }
}