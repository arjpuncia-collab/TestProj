import { Controller, Get, Post, Body } from '@nestjs/common';
import { CrewService } from './crew.service';

@Controller('crew')
export class CrewController {
  constructor(private readonly crewService: CrewService) {}

  @Get()
  findAll() {
    return this.crewService.getAllCrews();
  }

  @Post()
  create(@Body() crewData: any) {
    return this.crewService.createCrew(crewData);
  }
}