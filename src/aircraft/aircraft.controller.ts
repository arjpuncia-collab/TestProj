import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AircraftService } from './aircraft.service';

@Controller('aircraft')
export class AircraftController {
  constructor(
    private readonly aircraftService: AircraftService,
  ) {}

  @Get()
  findAll() {
    return this.aircraftService.getAllAircrafts();
  }

  @Post()
  create(@Body() aircraftData: any) {
    return this.aircraftService.createAircraft(aircraftData);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() aircraftData: any,
  ) {
    return this.aircraftService.updateAircraft(
      +id,
      aircraftData,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aircraftService.deleteAircraft(+id);
  }
}