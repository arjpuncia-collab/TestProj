import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payments.controller';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}