import { AppError } from "@/errors/appError";
import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";

export class CurrencyController {
  static fetchAllCurrencyController = catchAsync(
    async (req: Request, res: Response) => {
      const currencyPromiseData = await fetch(
        `https://api.exchangerate.host/list?access_key=${process.env.CURRENCY_API_KEY}`
      );
      const currencyResponseData = await currencyPromiseData.json();
      if (currencyResponseData?.success) {
        return res.status(200).json(currencyResponseData);
      }
      throw new AppError(
        400,
        "Something went wrong",
        "Falied to fetch currency"
      );
    }
  );
  static convertCurrencyController = catchAsync(
    async (req: Request, res: Response) => {
      const { from, to, amount } = req.query;
      const currencyPromiseData = await fetch(
        `https://api.exchangerate.host/convert?access_key=${process.env.CURRENCY_API_KEY}&from=${from}&to=${to}&amount=${amount}`
      );
      const currencyResponseData = await currencyPromiseData.json();
      if (currencyResponseData?.success) {
        return res.status(200).json(currencyResponseData);
      }
      throw new AppError(
        400,
        "Something went wrong",
        `Falied to convert ${from} to ${to} currency`
      );
    }
  );
}
