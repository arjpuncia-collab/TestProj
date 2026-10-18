import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
  ) {}

  @Get()
  findAll() {
    return this.paymentService.getAllPayments();
  }

  @Post()
  create(@Body() paymentData: any) {
    return this.paymentService.createPayment(paymentData);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() paymentData: any,
  ) {
    return this.paymentService.updatePayment(
      +id,
      paymentData,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.deletePayment(+id);
  }
}