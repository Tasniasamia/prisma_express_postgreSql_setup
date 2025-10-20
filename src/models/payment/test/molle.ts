import { createMollieClient } from '@mollie/api-client';  // ✅ named import

const mollieClient = createMollieClient({
  apiKey:'test_VgFTCfrUHDthuyyfqM5qvDftrUaq5R',
});

export const molieController = async () => {
  try {
    const payment = await mollieClient.payments.create({
      amount: {
        currency: 'EUR',
        value: '50.00',
      },
      description: 'My first local test payment',
      redirectUrl: 'http://localhost:4000/payment/success',
      webhookUrl: 'https://orchestrally-unreferred-caterina.ngrok-free.dev/payment/webhook',
      metadata: {
        order_id: '12345',
      },
    });

    console.log('✅ Payment created successfully!');
    console.log('🧾 Payment ID:', payment.id);
    console.log('🔗 Checkout URL:', payment);
    console.log('🔗 Checkout URL:', payment?._links.checkout?.href);


    return payment?._links.checkout?.href;
  } catch (error: any) {
    console.error('❌ Mollie Error:', error.message || error);
    throw error;
  }
};
