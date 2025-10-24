import { Router } from "express";
import { CurrencyController } from "./currency.controller";

const route=Router();
route.get('/list',CurrencyController.fetchAllCurrencyController);
route.get('/convert',CurrencyController.convertCurrencyController);

export const currencyRoute:Router=route;