import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import {
  findCourseByInfo,
  findPaidCourseByUser,
  findRoleUser,
} from "./payment.service";
import { AppError } from "@/errors/appError";
import { checkMolliePaymentStatus, molieController } from "@/utils/molie";
import z, { success } from "zod";
import { db } from "@/config/db";

export class PaymentController {
  static postPaymentController = catchAsync(
    async (req: Request, res: Response) => {
      const {
        amount,
        status,
        payment_method,
        currency_code,
        course_id,
        user_id,
      } = await req?.body;
      const isAlreadyEnrolled = await findPaidCourseByUser(user_id, course_id);
      const findUser = await findRoleUser(user_id);
      const isCouseValid = await findCourseByInfo(
        course_id,
        amount,
        currency_code
      );
      if (!isCouseValid) {
        throw new AppError(
          400,
          "something went wrong",
          "Failed to find Course"
        );
      }
      if (!findUser) {
        throw new AppError(
          400,
          "Something went wrong",
          "Only User can access here"
        );
      }
      if (isAlreadyEnrolled) {
        throw new AppError(
          400,
          "Something went wrong",
          "Yon have already paid for enroll course"
        );
      }
      if (payment_method === "mollie") {
        if (currency_code !== "EUR") {
          throw new AppError(
            400,
            "Something went wrong",
            "Please Select EUR as currency_code for mollie test mode"
          );
        }
        const data = await molieController(currency_code, amount);
        const jsonData = JSON.stringify(data);
        if (!jsonData) {
          throw new AppError(
            400,
            "Something went wrong",
            "Failed to create payment by mollie"
          );
        }
        const parseJsonData = JSON.parse(jsonData);
        const url: string | any = parseJsonData?._links?.checkout?.href;
        const id: any = parseJsonData?.id;
        await db.payment.create({
          data: {
            amount: amount,
            payment_method: payment_method,
            currency_code: currency_code,
            course_id: course_id,
            user_id: user_id,
            transaction_id: id,
          },
        });
        return res.status(200).json({
          success: true,
          message: "Payment Create Successfully",
          data: { url: url, transaction_id: id, method: payment_method },
        });
      }
      res.status(200).json({});
    }
  );

  static checkandUpdatePaymentStatusController = async (
    req: Request,
    res: Response
  ) => {
    const payment_method = req?.query?.payment_method as string;
    const tranc_id = req?.query?.tranc_id as string;
    const paymentData = await db.payment.findFirst({
      where: { transaction_id: tranc_id },
    });
    //mollie
    if (payment_method === "mollie") {
      const getdata = await checkMolliePaymentStatus(tranc_id);
      if (getdata?.status) {
        if (getdata?.status === "paid") {
          console.log("paymentData", paymentData);
          //    const findCourse=await db.course.findFirst({where:{id:paymentData?.course_id}});
          //    if(findCourse?.sit == 0){
          //      throw new AppError(400,'Something went wrong','No Sit available for course')
          //    }
          await db.course.update({
            where: { id: paymentData?.course_id },
            data: { sit: { decrement: 1 } },
          });
        }
        const data = await db.payment.update({
          where: { transaction_id: tranc_id },
          data: { status: getdata?.status },
        });
        return res
          .status(200)
          .json({
            success: true,
            message: "Status updated successfully",
            data: data,
          });
      }
    }
    //for all
    return res.status(200).json({});
  };


}
