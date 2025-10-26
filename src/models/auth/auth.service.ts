import { db } from "@/config/db";
import { userService } from "../user/user.service";
import { RegistrationInput } from "../user/user.validate";
import { AppError } from "@/errors/appError";
import { Role } from "@/generated/prisma";

export class AuthService{
  

    static postUser=async(payload:RegistrationInput)=>{
        if(!payload){
            throw new AppError(400,'Something went wrong','Payload is to create user')
        }
        const findUser=await userService.findUserByEmail(payload?.email);

        if(findUser){
            throw new AppError(400,'User Already Exist','User Already Exist');
        }
       
        return await db.user.create({
            data: {
              ...payload,
              role: payload.role.toUpperCase() as Role, // ✅ cast to enum
            },
          });       
 
    }

    static updateUser=async(email:string,data:object)=>{
        const findUser=await userService.findUserByEmail(email);
        if(!findUser){
            throw new AppError(400,'User Not Found','User Not Found');
        }
       return await db.user.update({
            where: { email: email },
            data: data,
          });
    } 

}