import { Module } from '@nestjs/common';
import { PassengersModule } from './passengers/passengers.module';

@Module({
  imports: [PassengersModule],
})
export class AppModule {}