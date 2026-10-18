import { Controller, Get, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  findAll() {
    return this.paymentService.getAllPayments();
  }

  @Post()
  create(@Body() paymentData: any) {
    return this.paymentService.createPayment(paymentData);
  }
}
