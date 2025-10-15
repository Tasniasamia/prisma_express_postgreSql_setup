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
    return otp.toLocaleString();

}

const sendEmail=async(email:string,otp:string)=>{
    const findSettings=await SettingService.findResendEmailSettings();

    const api_key=findSettings?.email_config?.resend_api_key;
    const resend = new Resend(api_key);
    const { data, error } = await resend.emails.send({
      from: `Summer Camp <${findSettings?.email_config?.resend_email}>`,
      to: [`${email}`],
      subject: 'Hello User',
      html: `<strong>Your OTP verification code is ${otp}</strong>`,
    });
}


export {validateEmail,generateOTP,sendEmail}