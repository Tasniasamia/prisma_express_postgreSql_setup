import { db } from "@/config/db"

export class userService{
    static findUserByEmail=async(email:string)=>{
     const findUser=await db.user.findUnique({where:{email:email}});
     if(!findUser){
        return null;
     }
     return findUser;
    }
    static findUserByPhone=async(phone:string)=>{
        const findUser=await db.user.findFirst({where:{phone:phone}});
        return findUser;
    }
}