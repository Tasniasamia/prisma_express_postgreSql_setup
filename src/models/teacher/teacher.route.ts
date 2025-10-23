import {  Router } from "express";
import {  upload } from "@/middlewares/multer";
import { isVerifyAdmin } from "@/middlewares/verifyToken";
import { TeacherController } from "./teacher.controller";


const route = Router();
route.get('/',isVerifyAdmin,TeacherController.findTeacherControllerAdmin);
route.put('/',upload.single('image'),isVerifyAdmin,TeacherController.updateTeacherProfileController);


export const teacherRoutes: Router = route;
