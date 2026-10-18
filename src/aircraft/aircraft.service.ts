import { Injectable } from '@nestjs/common';

interface Aircraft {
  aircraft_id: number;
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

  createAircraft(aircraftData: Aircraft) {
    this.aircrafts.push(aircraftData);

    return {
      message: 'Aircraft created successfully',
      data: aircraftData,
    };
  }
}