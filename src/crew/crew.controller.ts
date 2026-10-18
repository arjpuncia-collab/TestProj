import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CrewService } from './crew.service';

@Controller('crew')
export class CrewController {
  constructor(
    private readonly crewService: CrewService,
  ) {}

  @Get()
  findAll() {
    return this.crewService.getAllCrews();
  }

  @Post()
  create(@Body() crewData: any) {
    return this.crewService.createCrew(crewData);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() crewData: any,
  ) {
    return this.crewService.updateCrew(+id, crewData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crewService.deleteCrew(+id);
  }
}