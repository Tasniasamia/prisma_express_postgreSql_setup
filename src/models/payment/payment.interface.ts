export interface PaymentInput {
    amount: number;
    status?: string;        
    payment_method: string;
    currency_code: string;
    course_id: string;
    user_id: string;
  }
  