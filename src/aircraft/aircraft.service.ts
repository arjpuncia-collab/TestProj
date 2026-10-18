import { Injectable } from '@nestjs/common';

interface Aircraft {
  id: number;
  aircraft_name: string;
  aircraft_model: string;
  capacity: number;
  manufacturer: string;
}

@Injectable()
export class AircraftService {
  private aircrafts: Aircraft[] = [];

  getAllAircrafts() {
    return this.aircrafts;
  }

  createAircraft(aircraftData: any) {
    const newAircraft = {
      id: this.aircrafts.length + 1,
      ...aircraftData,
    };

    this.aircrafts.push(newAircraft);

    return {
      message: 'Aircraft created successfully',
      data: newAircraft,
    };
  }

  updateAircraft(id: number, aircraftData: any) {
    const index = this.aircrafts.findIndex(
      aircraft => aircraft.id === id,
    );

    if (index === -1) {
      return {
        message: 'Aircraft not found',
      };
    }

    this.aircrafts[index] = {
      ...this.aircrafts[index],
      ...aircraftData,
    };

    return {
      message: 'Aircraft updated successfully',
      data: this.aircrafts[index],
    };
  }

  deleteAircraft(id: number) {
    this.aircrafts = this.aircrafts.filter(
      aircraft => aircraft.id !== id,
    );

    return {
      message: 'Aircraft deleted successfully',
    };
  }
}