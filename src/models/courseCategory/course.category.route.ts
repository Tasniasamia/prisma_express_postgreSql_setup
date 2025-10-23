import { validate } from "@/middlewares/validate";
import { isVerifyAdmin } from "@/middlewares/verifyToken";
import { Router } from "express";
import { courseCategoryValidate, updateCourseCategoryValidate } from "./course.category.validate";
import { CourseCategoryController } from "./course.category.controller";


const router = Router();

router.post(
    '/',
    isVerifyAdmin,
    validate(courseCategoryValidate.courseCatgorySchemaValidation),
    CourseCategoryController.postCourseCategoryController,
);
router.put(
    '/',
    isVerifyAdmin,
    validate(updateCourseCategoryValidate.updateCourseCatgorySchemaValidation),
    CourseCategoryController.updateCourseCategoryController
)
router.get('/',CourseCategoryController.findCourseCategoryControllerPublic)
router.get('/admin',isVerifyAdmin,CourseCategoryController.findCourseCategoryController)
router.delete('/',isVerifyAdmin,CourseCategoryController.deleteCourseCategoryController)
export const CourseCategoryRoutes: Router = router;
