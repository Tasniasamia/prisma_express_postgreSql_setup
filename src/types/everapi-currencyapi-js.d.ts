declare module "@everapi/currencyapi-js" {
    export default class currencyapi {
      constructor(apiKey: string);
      currencies(): Promise<any>;
      latest(params: {
        base_currency?: string;
        currencies?: string[] | string;
      }): Promise<any>;
    }
  }
  