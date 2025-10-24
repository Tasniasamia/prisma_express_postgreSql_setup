import { AppError } from "@/errors/appError";
import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import currencyapi from "@everapi/currencyapi-js";

const client = new currencyapi(process.env.CURRENCY_API_KEY!);

export class CurrencyController {

  static fetchAllCurrencyController = catchAsync(
    async (req: Request, res: Response) => {
      try {
        const response = await client.currencies();

        if (response?.data) {
          return res.status(200).json({
            success: true,
            total: Object.keys(response.data).length,
            currencies: response.data,
          });
        }

        throw new AppError(
          400,
          "Something went wrong",
          "Failed to fetch currencies"
        );
      } catch (err: any) {
        throw new AppError(500, err.message, "Currency fetch error");
      }
    }
  );


  static convertCurrencyController = catchAsync(
    async (req: Request, res: Response) => {
      try {
        const { from, to, amount } = req.query;

        if (!from || !to || !amount) {
          throw new AppError(
            400,
            "Missing required parameters",
            "from, to, and amount are required"
          );
        }

        const response = await client.latest({
          base_currency: String(from),
          currencies: [String(to)],
        });

        const rate = response.data[to as string]?.value;
        if (!rate) {
          throw new AppError(404, "Invalid currency code", "Conversion failed");
        }

        const convertedAmount = Number(amount) * rate;

        return res.status(200).json({
          success: true,
          from,
          to,
          rate,
          amount: Number(amount),
          convertedAmount: Number(convertedAmount.toFixed(2)),
        });
      } catch (err: any) {
        throw new AppError(500, err.message, "Currency conversion error");
      }
    }
  );
}
