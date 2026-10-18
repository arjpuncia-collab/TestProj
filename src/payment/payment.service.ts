import { Injectable } from '@nestjs/common';

interface Payment {
  id: number;
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

  createPayment(paymentData: any) {
    const newPayment = {
      id: this.payments.length + 1,
      ...paymentData,
    };

    this.payments.push(newPayment);

    return {
      message: 'Payment created successfully',
      data: newPayment,
    };
  }

  updatePayment(id: number, paymentData: any) {
    const index = this.payments.findIndex(
      payment => payment.id === id,
    );

    if (index === -1) {
      return {
        message: 'Payment not found',
      };
    }

    this.payments[index] = {
      ...this.payments[index],
      ...paymentData,
    };

    return {
      message: 'Payment updated successfully',
      data: this.payments[index],
    };
  }

  deletePayment(id: number) {
    this.payments = this.payments.filter(
      payment => payment.id !== id,
    );

    return {
      message: 'Payment deleted successfully',
    };
  }
}