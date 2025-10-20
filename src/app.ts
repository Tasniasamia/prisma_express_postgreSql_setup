
import express from "express"
import helmet from "helmet"
import cors from 'cors'
import morgan from "morgan"
import dotenv from "dotenv"
import { db } from "./config/db"
import middleware from "./middlewares"
import z from "zod"
import route from "./routes"
import globalErrorHandler from "./middlewares/globalErrorHandler"
import nodemailer from "nodemailer"
import emailjs from '@emailjs/browser'
import { Resend } from "resend"
import { notFoundHandler } from "./middlewares/notFoundHandler"
import { initCloudinary } from "./utils/cloudinary"
import path from "path"
import { fileURLToPath } from "url"
import { molieController } from "./models/payment/test/molle"
  dotenv.config({path: './.env',});
  
  export const envMode = process.env.NODE_ENV?.trim() || 'development';
  const port = process.env.PORT || 4000;
  const app = express();


  
app.use(
  helmet({
    contentSecurityPolicy: envMode !== "DEVELOPMENT",
    crossOriginEmbedderPolicy: envMode !== "DEVELOPMENT",
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(cors({ origin: '*', credentials: true }));

app.use(...middleware); 
app.use('/api/v1',route);
app.post('/', async (req, res) => {
  try {
    
    res.status(201).send('User created Successfully');
  } catch (error) {
    res.status(500).send('Error creating user');
  }
});
  
  
/*Sending otp to email*/ 
  app.post('/send',async(req,res)=>{
  /*using nodemailer*/
    // const transporter =await  nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: "nestor.batz82@ethereal.email",
    //     pass: "we4rcm9KhGPY71qdVc",
    //   },
    // });
    //   const info = await transporter.sendMail({
    //     from: '"Maddison Foo Koch" <jude.boyer14@ethereal.email>',
    //     to: "sharintasnia1@gmail.com",
    //     subject: "Hello ✔",
    //     text: "Hello world?", // plain‑text body
    //     html: "<b>Hello world?</b>", // HTML body
    //   });
    // await res.status(200).send(info);

     /*resend processing*/
    // const resend = new Resend('re_Hd9Bp22d_4chxCX2omkZVfnWp2hQbsGJv');
    // const { data, error } = await resend.emails.send({
    //   from: 'Summer Camp <onboarding@resend.dev>',
    //   to: ['sharintasnia1@gmail.com'],
    //   subject: 'Hello World',
    //   html: '<strong>Your OTP verification code is .....</strong>',
    // });
    res.status(200).send("ok");
  })
/*payment api testing*/

app.post('/payment',async(req,res)=>{
  const moie=await molieController();
  return res.status(200).json(moie)
})








  app.get("*", (req, res) => {
    res.status(404).json({
      success: false,
      message: "Page not found",
    });
  });
  
  app.use(globalErrorHandler);
  app.use(notFoundHandler);
  (async () => {
    await initCloudinary();
    app.listen(4000, () => console.log("Server running on port 4000"));
  })();  