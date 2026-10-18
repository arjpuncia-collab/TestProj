import { Injectable } from '@nestjs/common';

interface Crew {
  id: number;
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

  createCrew(crewData: any) {
    const newCrew = {
      id: this.crews.length + 1,
      ...crewData,
    };

    this.crews.push(newCrew);

    return {
      message: 'Crew created successfully',
      data: newCrew,
    };
  }

  updateCrew(id: number, crewData: any) {
    const index = this.crews.findIndex(
      crew => crew.id === id,
    );

    if (index === -1) {
      return {
        message: 'Crew not found',
      };
    }

    this.crews[index] = {
      ...this.crews[index],
      ...crewData,
    };

    return {
      message: 'Crew updated successfully',
      data: this.crews[index],
    };
  }

  deleteCrew(id: number) {
    this.crews = this.crews.filter(
      crew => crew.id !== id,
    );

    return {
      message: 'Crew deleted successfully',
    };
  }
}