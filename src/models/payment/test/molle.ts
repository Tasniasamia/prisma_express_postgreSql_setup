import { createMollieClient } from '@mollie/api-client';  // ✅ named import

const mollieClient = createMollieClient({
  apiKey:'test_PvWxzca3eTETNgqN2HD2QPj563FkNt',
});

export const molieController = async () => {
  try {
    const payment = await mollieClient.payments.create({
      amount: {
        currency: 'EUR',
        value: '10.00',
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

    return payment;
  } catch (error: any) {
    console.error('❌ Mollie Error:', error.message || error);
    throw error;
  }
};
