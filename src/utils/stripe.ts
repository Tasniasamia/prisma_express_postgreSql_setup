// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// export const stripeController = async (currency: string, amount: string) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency,
//             product_data: {
//               name: "Test Payment",
//             },
//             unit_amount: Math.round(parseFloat(amount) * 100), // convert to smallest currency unit
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: process.env.STRIPE_SUCCESS_URL,
//       cancel_url: process.env.STRIPE_CANCEL_URL,
//     });

//     // return checkout URL
//     return session.url;
//   } catch (error: any) {
//     console.error("❌ Stripe Error:", error.message || error);
//     throw error;
//   }
// };
