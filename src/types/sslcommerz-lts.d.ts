declare module "sslcommerz-lts" {
    export default class SSLCommerzPayment {
      constructor(store_id: string, store_passwd: string, live: boolean);
      init(data: Record<string, any>): Promise<{ GatewayPageURL: string }>;
    }
  }
  