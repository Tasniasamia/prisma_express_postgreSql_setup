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
    const otp=(Math.random()*100000)+100000
    return otp

}

const sendEmail=async(email:string,otp:string)=>{
    const findSettings=await SettingService.findSettings();
    const api_key=findSettings?.email_config?.resend_api_key;
    const resend = new Resend('re_Hd9Bp22d_4chxCX2omkZVfnWp2hQbsGJv');
    const { data, error } = await resend.emails.send({
      from: 'Summer Camp <brbsharin@gmail.com>',
      to: [`${email}`],
      subject: 'Hello User',
      html: `<strong>Your OTP verification code is ${otp}</strong>`,
    });
}


export {validateEmail,generateOTP}