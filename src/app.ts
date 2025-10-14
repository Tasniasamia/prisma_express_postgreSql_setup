
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
  dotenv.config({path: './.env',});
  
  export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
  const port = process.env.PORT || 3000;
  const app = express();
  
console.log("z.string",z.string({message:'wrr'}))           
  
  
app.use(
  helmet({
    contentSecurityPolicy: envMode !== "DEVELOPMENT",
    crossOriginEmbedderPolicy: envMode !== "DEVELOPMENT",
  })
);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin:' * ',credentials:true}));
app.use(...middleware); 
app.use('/api/v1',route);
app.post('/', async (req, res) => {
  try {
    const createUser = await db.user.create({
      data: {
        name: "Tasnia",
        email: "you@gmail.com"
      }
    });

    res.status(201).send('User created Successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
});
  
  
  app.post('/send',async(req,res)=>{
    const transporter = nodemailer.createTransport({
      host: "admin@gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "jude.boyer14@ethereal.email",
        pass: "cvhXGfpt78dvJcVB8g",
      },
    });
    
    // Wrap in an async IIFE so we can use await.
  
      const info = await transporter.sendMail({
        from: '"Maddison Foo Koch" <jude.boyer14@ethereal.email>',
        to: "sharintasnia1@gmail.com",
        subject: "Hello ✔",
        text: "Hello world?", // plain‑text body
        html: "<b>Hello world?</b>", // HTML body
      });
    res.status(200).send(info);
  })
  app.get("*", (req, res) => {
    res.status(404).json({
      success: false,
      message: "Page not found",
    });
  });
  
  app.use(globalErrorHandler);
  app.listen(port, () => console.log('Server is working on Port:'+port+' in '+envMode+' Mode.'));
  