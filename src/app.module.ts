import { Module } from '@nestjs/common';

import { BookingsController } from './bookings/bookings.controller';
import { PassengersController } from './passengers/passengers.controller';
import { FlightsController } from './flights/flights.controller';
import { AircraftsController } from './aircraft/aircraft.controller';
import { PaymentsController } from './payment/payments.controller';
import { CrewController } from './crew/crew.controller';
import { FlightCrewAssignmentController } from './flight-crew-assignment/flight-crew-assignment.controller';

import { PassengersService } from './passengers/passengers.service';
import { FlightsService } from './flights/flights.service';
import { AircraftService } from './aircraft/aircraft.service';
import { BookingsService } from './bookings/bookings.service';
import { PaymentsService } from './payment/payment.service';
import { CrewService } from './crew/crew.service';
import { FlightCrewAssignmentService } from './flight-crew-assignment/flight-crew-assignment.service';

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
  providers: [
    PassengersService,
    FlightsService,
    AircraftService,
    BookingsService,
    PaymentsService,
    CrewService,
    FlightCrewAssignmentService,
  ],
})
export class AppModule {}