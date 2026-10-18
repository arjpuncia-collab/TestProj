import { Injectable } from '@nestjs/common';

interface Payment {
  payment_id: number;
  booking_id: number;
  amount: number;
  payment_method: string;
  payment_date: string;
  status: string;
}

@Injectable()
export class PaymentService {
  private payments: Payment[] = [];

  getAllPayments() {
    return this.payments;
  }

  createPayment(paymentData: Payment) {
    this.payments.push(paymentData);

    return {
      message: 'Payment created successfully',
      data: paymentData,
    };
  }
}