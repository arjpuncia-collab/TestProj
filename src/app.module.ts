import { Module } from '@nestjs/common';
import { BookingsController } from './bookings/bookings.controller';
import { PassengersController } from './passengers/passengers.controller';
import { FlightsController } from './flights/flights.controller';
import { AircraftsController } from './aircraft/aircraft.controller';
import { PaymentsController } from './payment/payments.controller';
import { CrewController } from './crew/crew.controller';
import { FlightCrewAssignmentController } from './flight-crew-assignment/flight-crew-assignment.controller';

@Module({
  controllers: [
    BookingsController,
    PassengersController,
    FlightsController,
    AircraftsController,
    PaymentsController,
    CrewController,
    FlightCrewAssignmentController,
  ],
})
export class AppModule {}