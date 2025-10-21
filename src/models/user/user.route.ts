import { validate } from "@/middlewares/validate";
import { Router } from "express";
import { userValidate } from "./user.validate";
import { userController } from "./user.controller";
import { isVerifyAdmin } from "@/middlewares/verifyToken";

const router = Router();
router.get(
  "/admin",isVerifyAdmin,
  userController.getAllUserByAdmin
);
export const userRoutes:Router=router;