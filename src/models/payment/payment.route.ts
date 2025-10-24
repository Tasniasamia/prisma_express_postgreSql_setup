import { isVerify } from "@/middlewares/verifyToken";
import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { validate } from "@/middlewares/validate";
import { paymentSchema } from "./payment.validate";

const route=Router();
route.post('/',isVerify,validate(paymentSchema),PaymentController.postPaymentController);
route.get('/',PaymentController.checkandUpdatePaymentStatusController);
export const paymentRoutes:Router=route;