import { validate } from "@/middlewares/validate";
import { isVerifyAdmin } from "@/middlewares/verifyToken";
import { Router } from "express";
import { courseValidation, updateCourseValidation } from "./course.validate";
import { CourseController } from "./course.controller";



const router = Router();

router.post(
    '/',
    isVerifyAdmin,
    validate(courseValidation),
    CourseController.postCourseController,
);
router.put(
    '/',
    isVerifyAdmin,
    validate(updateCourseValidation),
    CourseController.updateCourseController
)
router.get('/',CourseController.findCourseControllerPublic)
router.get('/admin',isVerifyAdmin,CourseController.findCourseController)
router.delete('/',isVerifyAdmin,CourseController.deleteCourseController)
export const CourseRoutes: Router = router;
