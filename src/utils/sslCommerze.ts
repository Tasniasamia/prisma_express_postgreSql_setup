// import SSLCommerzPayment from "sslcommerz-lts";

// const store_id = process.env.SSLC_STORE_ID as string;
// const store_passwd = process.env.SSLC_STORE_PASSWORD as string;
// const is_live = false; // sandbox = false, live = true

// export const sslcommerzController = async (currency: string, amount: string) => {
//   try {
//     const data = {
//       total_amount: parseFloat(amount),
//       currency,
//       tran_id: "REF" + Date.now(),
//       success_url: process.env.SSLC_SUCCESS_URL,
//       fail_url: process.env.SSLC_FAIL_URL,
//       cancel_url: process.env.SSLC_CANCEL_URL,
//       ipn_url: process.env.SSLC_IPN_URL,
//       shipping_method: "NO",
//       product_name: "Test Payment",
//       product_category: "General",
//       product_profile: "general",
//       cus_name: "Customer Name",
//       cus_email: "customer@example.com",
//       cus_add1: "Dhaka",
//       cus_city: "Dhaka",
//       cus_country: "Bangladesh",
//       cus_phone: "01700000000",
//     };

//     const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
//     const apiResponse = await sslcz.init(data);

//     return apiResponse.GatewayPageURL;
//   } catch (error: any) {
//     console.error("❌ SSLCommerz Error:", error.message || error);
//     throw error;
//   }
// };
