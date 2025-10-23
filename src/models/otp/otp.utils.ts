import { Resend } from "resend";
import z from "zod"
import { SettingService } from "../settings/settings.service";

const validateEmail=(email:string):any=>{
    const emailSchema = z.string().email();
    if(emailSchema.parse(email)){
   return true;
    }
return false;
}

const generateOTP=()=>{
    const otp=Math.ceil((Math.random()*100000)+100000);
    return otp.toString();

}

const sendEmail=async(email:string,otp:string)=>{

    const api_key=process.env.RESEND_API_KEY;
    const resend = new Resend(api_key);
    const { data, error } = await resend.emails.send({
      from: 'Summer Camp <onboarding@resend.dev>',
      to: [`${process.env.RESEND_EMAIL}`],
      subject: 'Hello User',
      html: `<strong>Your OTP verification code is ${otp}</strong>`,
    });
   
}


export {validateEmail,generateOTP,sendEmail}