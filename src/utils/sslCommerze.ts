import { AppError } from "@/errors/appError";
import SSLCommerzPayment from "sslcommerz-lts"; // ✅ npm i sslcommerz-lts

const store_id = process.env.STORE_ID!;
const store_passwd = process.env.STORE_PASSWORD!;
const is_live = false;

  export const sslCommerzeController = async ( currency_code:string,amount:number|any) => {

    const transactionId = "txn_" + Date.now();

    const data = {
      total_amount: amount,
      currency: currency_code,
      tran_id: transactionId,
      success_url: `${process.env.BACKEND_URL}/api/v1/payment/success?tran_id=${transactionId}`,
      fail_url: `${process.env.BACKEND_URL}/api/v1/payment/fail?tran_id=${transactionId}`,
      cancel_url: `${process.env.BACKEND_URL}/api/v1/payment/cancel?tran_id=${transactionId}`,
      ipn_url: `${process.env.BACKEND_URL}/api/v1/payment/ipn`,
      shipping_method: "NO",
      product_name: "",
      product_category: "Course",
      product_profile: "general",
      cus_name: "",
      cus_email: "",
      cus_add1: "Dhaka",
      cus_city: "Dhaka",
      cus_country: "Bangladesh",
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    const apiResponse = await sslcz.init(data);
    console.log("apiResponse",apiResponse);

    if (!apiResponse.GatewayPageURL) {
      throw new AppError(400, "Failed to create payment session", "No Gateway URL");
    }
    return apiResponse;
   
  }

