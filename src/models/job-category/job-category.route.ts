import { validate } from "@/middlewares/validate";
import { isVerifyAdmin } from "@/middlewares/verifyToken";
import { Router } from "express";
import { jobCategoryValidate, updatejobCategoryValidate } from "./job-category.validate";
import { JobCategoryController } from "./job-category.controller";

const router = Router();

router.post(
    '/',
    isVerifyAdmin,
    validate(jobCategoryValidate.jobCatgorySchemaValidation),
    JobCategoryController.postJobCategoryController,
);
router.put(
    '/',
    isVerifyAdmin,
    validate(updatejobCategoryValidate.updatejobCatgorySchemaValidation),
    JobCategoryController.updateJobCategoryController
)
router.get('/',JobCategoryController.findJobCategoryControllerPublic)
router.get('/admin',isVerifyAdmin,JobCategoryController.findJobCategoryController)
router.delete('/',isVerifyAdmin,JobCategoryController.deleteController)
export const JobCategoryRoutes: Router = router;
