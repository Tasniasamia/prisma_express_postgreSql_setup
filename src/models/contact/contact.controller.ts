import { AppError } from "@/errors/appError";
import { catchAsync } from "@/utils/catchAsync";
import { globalService } from "@/utils/global.service";
import { Request, Response } from "express";
import { success } from "zod";

export class ContactController{
    static postContact=catchAsync(async(req:Request,res:Response)=>{
       const payload=await req?.body;
      const createContact=await globalService.createDocument({ data:payload,
        model:"contact"})
      if(!createContact){
        throw new AppError(400,'Something went wrong','Failed to create contact')
      }
      return res.status(200).json({success:true,message:'Create contact succssfully',data:createContact})
    });
    static replyContact=catchAsync(async(req:Request,res:Response)=>{
        const payload=await req?.body;
        const existContact=await globalService.existDocument({    query:payload?.id,
            model:'contact',
            shouldExist : true,
            isError:false,
            errorMessages:'',
            include:{},})

       const replyContact=await globalService.updateDocument({id:payload?.id, data:payload,
         model:"contact"})
       if(!replyContact){
         throw new AppError(400,'Something went wrong','Failed to reply contact')
       }
       return res.status(200).json({success:true,message:'Create reply succssfully',data:replyContact})
     });
     static findContactController = catchAsync(
        async (req: Request, res: Response) => {
          const {
            page = "1",
            limit = "8",
            search = "",
          } = req.query as any;
      
          // Search conditions
          const OR: any[] = search
            ? [
                {
                  name: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  email: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              ]
            : [];
      
          const where: any = {
            ...(OR.length ? { OR } : {}),
          };
      
          // Fetch contacts
          const data = await globalService.getDocuments({
            model: "contact",
            filter: where,
            include: {}, // no relations needed
            select: {},
            page: parseInt(page),
            limit: parseInt(limit),
          });
      
          return res.status(200).json({
            success: true,
            message: "Contacts fetched successfully",
            data,
          });
        }
      );
      
}