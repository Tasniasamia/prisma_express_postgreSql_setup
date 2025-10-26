import { db } from "@/config/db";
import { AppError } from "@/errors/appError";
import { globalService } from "@/utils/global.service";

export const findPaidCourseByUser = async (
  user_id: string,
  course_id: string
) => {
  if (!user_id || !course_id) {
    throw new AppError(
      400,
      "Something Went Wrong",
      "All field are required to find payment status"
    );
  }
  const data = await db.payment.findFirst({
    where: { user_id: user_id, course_id: course_id, status: "paid" },
  });
  if (data) {
    return true;
  }
  return false;
};

export const findRoleUser = async (id: string) => {
  if (!id) {
    throw new AppError(
      400,
      "Something Went Wrong",
      "Id field is required to find user"
    );
  }
  const data = await db.user.findUnique({ where: { id: id } });
  console.log("role", data);
  if (data?.role === "USER") {
    return true;
  }
  return false;
};

export const findCourseByInfo = async (
  id: string,
  amount: number | any,
  currency_code: string | any
) => {
  if (!id || !amount || !currency_code) {
    throw new AppError(
      400,
      "Something Went Wrong",
      "All field are required to find course details"
    );
  }
  const data = await db.course.findFirst({
    where: { id: id, price: amount, currency_code: currency_code },
  });
  if (data?.sit === 0) {
    throw new AppError(
      400,
      "Something went wrong",
      "No Seat available for course"
    );
  }
  if (data) {
    return true;
  }
  return false;
};

export const updatePaymentStatus = async <T>(
  statusData: any,
  paymentData: any,
  tranc_id: string
) => {
  if (statusData?.status !== "paid") {
    throw new AppError(
      400,
      "Something went wrong",
      `Your payment is ${statusData?.status}`
    );
  }
  let data;

  if (statusData?.status === "paid") {
    
        await db.$transaction(async (tx) => {
      const getCourse = await tx.course.findUnique({
        where: { id: paymentData?.course_id },
        include: { instructors: true },
      });
  
      const instructors = getCourse?.instructors || [];
  
      // Create messageFriend for each instructor
      await Promise.all(
        instructors.map((i) =>
          tx.messageFriend.create({
            data: { friendId: i.id, accountId: paymentData.user_id },
          })
        )
      );
  
      // Decrease course seat
      await tx.course.update({
        where: { id: paymentData.course_id },
        data: { sit: { decrement: 1 } },
      });
  
      // Update payment status
      return await tx.payment.update({
        where: { transaction_id: tranc_id },
        data: { status: statusData.status },
      });
    });


  }
return data;
};

export const createPayment = async (
  amount: number,
  payment_method: string,
  currency_code: string,
  course_id: string,
  user_id: string,
  id: string
): Promise<any> => {
  if (
    !amount ||
    !payment_method ||
    !currency_code ||
    !course_id ||
    !user_id ||
    !id
  ) {
    throw new AppError(
      400,
      "Something went wrong",
      "All fields are required to create payment into payment database"
    );
  }
  const data = await db.payment.create({
    data: {
      amount: amount,
      payment_method: payment_method,
      currency_code: currency_code,
      course_id: course_id,
      user_id: user_id,
      transaction_id: id,
    },
  });
  return data;
};

export const findDataByUser=async(id:string)=>{
  if(!id){
    throw new AppError(400,'Something went wrong','Id is required for find user');
  }
  const data=await globalService.getDocuments({model:'payment',filter:{user_id:id},include:{user:true,course:true}});
  console.log(data);
  return data

}
export const findDataByAdmin=async()=>{
  const data=await globalService.getDocuments({model:'payment',include:{user:true,course:true}});
  console.log(data);
  return data

}