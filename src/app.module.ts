import { Module } from '@nestjs/common';
import { PassengersModule } from './passengers/passengers.module';
import { BookingsModule } from './bookings/bookings.module';
import { FlightsModule } from './flights/flights.module';
import { AircraftModule } from './aircraft/aircraft.module';
import { PaymentModule } from './payment/payment.module';
import { CrewModule } from './crew/crew.module';
import { FlightCrewAssignmentModule } from './flight-crew-assignment/flight-crew-assignment.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [PassengersModule,
    BookingsModule,
    FlightsModule,
    AircraftModule,
    PaymentModule,
    CrewModule,
    FlightCrewAssignmentModule,
    UsersModule,
    AuthModule],
})
export class AppModule {}
