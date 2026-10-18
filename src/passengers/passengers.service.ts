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
  private passengers: (Passenger & { id: number })[] = [];

  getAllPassengers() {
    return this.passengers;
  }

  createPassenger(passengerData: Passenger) {
    const newPassenger = {
      id: this.passengers.length + 1,
      ...passengerData,
    };

    this.passengers.push(newPassenger);

    return {
      message: 'Passenger created successfully',
      data: newPassenger,
    };
  }

  updatePassenger(id: number, passengerData: any) {
    const index = this.passengers.findIndex(
      passenger => passenger.id === id,
    );

    if (index === -1) {
      return {
        message: 'Passenger not found',
      };
    }

    this.passengers[index] = {
      ...this.passengers[index],
      ...passengerData,
    };

    return {
      message: 'Passenger updated successfully',
      data: this.passengers[index],
    };
  }

  deletePassenger(id: number) {
    this.passengers = this.passengers.filter(
      passenger => passenger.id !== id,
    );

    return {
      message: `Passenger ${id} deleted successfully`,
    };
  }
}