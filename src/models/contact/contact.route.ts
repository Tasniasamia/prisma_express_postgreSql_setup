import { validate } from "@/middlewares/validate";
import { Router } from "express";
import { createContactValidationSchema, updateContactValidationSchema } from "./contact.validate";
import { ContactController } from "./contact.controller";
import { isVerifyAdmin } from "@/middlewares/verifyToken";

const route=Router();
route.post('/',validate(createContactValidationSchema),ContactController.postContact);
route.put('/',validate(updateContactValidationSchema),ContactController.replyContact);
route.get('/',isVerifyAdmin,ContactController.findContactController);

export const contactRoutes:Router=route;