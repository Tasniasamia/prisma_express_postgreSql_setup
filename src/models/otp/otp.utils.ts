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
    const findSettings=await SettingService.findResendEmailSettings();

    const api_key=findSettings?.email_config?.resend_api_key;
    const resend = new Resend(api_key);
    console.log("findSettings?.email_config?.resend_email",findSettings?.email_config?.resend_email)
    const { data, error } = await resend.emails.send({
      from: 'Summer Camp <onboarding@resend.dev>',
      to: [`${email}`],
      subject: 'Hello User',
      html: `<strong>Your OTP verification code is ${otp}</strong>`,
    });
    console.log("resend data",data);
    console.log("error data here",error)
}


export {validateEmail,generateOTP,sendEmail}