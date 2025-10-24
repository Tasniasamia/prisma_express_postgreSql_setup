import { createMollieClient } from '@mollie/api-client';  // ✅ named import
const getApikey:string|any=process.env.MOLIE_API_KEY
const mollieClient = createMollieClient({
  apiKey: getApikey
});

export const molieController = async (currency:string,amount:string|any) => {
  try {
    const payment = await mollieClient.payments.create({
      amount: {
        currency: currency,
        value: amount.toFixed(2),
      },
      description:'My first local test payment',
      redirectUrl:process.env.MOLIE_REDIRECT_URL,
      webhookUrl:process.env.MOLIE_WEBHOOK_URL,
     
    });
   return payment;
  } catch (error: any) {
    console.error('❌ Mollie Error:', error.message || error);
    throw error;
  }
};

export const checkMolliePaymentStatus=async(paymentId: string)=> {
    const payment = await mollieClient.payments.get(paymentId);
    return payment;
  }