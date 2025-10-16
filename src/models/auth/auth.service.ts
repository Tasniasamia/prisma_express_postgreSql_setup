import { db } from "@/config/db";
import { userService } from "../user/user.service";
import { RegistrationInput } from "../user/user.validate";
import { AppError } from "@/errors/appError";

export class AuthService{
  
    static postUser=async(payload:RegistrationInput)=>{
        const findUser=await userService.findUserByEmail(payload?.email);
        if(findUser){
            throw new AppError(400,'User Already Exist','User Already Exist');
        }
       return await db.user.create({data:payload});
 
    }

}