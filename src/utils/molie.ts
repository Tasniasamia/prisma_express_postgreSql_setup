import { createMollieClient } from '@mollie/api-client';  // ✅ named import
const getApikey:string|any=process.env.MOLIE_API_KEY
const mollieClient = createMollieClient({
  apiKey: getApikey
});

export const molieController = async (currency:string,amount:string) => {
  try {
    const payment = await mollieClient.payments.create({
      amount: {
        currency: currency,
        value: amount,
      },
      description:'My first local test payment',
      redirectUrl:process.env.MOLIE_REDIRECT_URL,
      webhookUrl:process.env.MOLIE_WEBHOOK_URL,
     
    });

    // console.log('✅ Payment created successfully!');
    // console.log('🧾 Payment ID:', payment.id);
    // console.log('🔗 Checkout URL:', payment);
    // console.log('🔗 Checkout URL:', payment?._links.checkout?.href);
   return payment;
    // return {payment?._links.checkout?.href}
  } catch (error: any) {
    console.error('❌ Mollie Error:', error.message || error);
    throw error;
  }
};
