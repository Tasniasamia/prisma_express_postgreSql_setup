import { db } from "@/config/db"
import { constants } from "buffer";

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
    static findAllUser=async(query:string)=>{
        const conditions = {
            OR: [
              { name: { contains: query, mode: "insensitive" as const } },
              { email: { contains: query, mode: "insensitive" as const} },
              { phone: { contains: query, mode: "insensitive" as const} },
            ],
          };
        const data = await db.user.findMany({
            where: query ? conditions : {}, // যদি query না আসে তাহলে সব user
          });
        
          return  data;
    }
}