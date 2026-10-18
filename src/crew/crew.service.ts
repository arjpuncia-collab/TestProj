import { Injectable } from '@nestjs/common';

interface Crew {
  crew_id: number;
  first_name: string;
  last_name: string;
  position: string;
  license_number: string;
  phone_number: string;
}

@Injectable()
export class CrewService {
  private crews: Crew[] = [];

  getAllCrews() {
    return this.crews;
  }

  createCrew(crewData: Crew) {
    this.crews.push(crewData);

    return {
      message: 'Crew created successfully',
      data: crewData,
    };
  }
}