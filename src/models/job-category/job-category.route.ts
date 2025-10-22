import { validate } from "@/middlewares/validate";
import { isVerifyAdmin } from "@/middlewares/verifyToken";
import { Router } from "express";
import { jobCategoryValidate } from "./job-category.validate";
import { JobCategoryController } from "./job-category.controller";

const router = Router();

router.post(
    '/',
    isVerifyAdmin,
    validate(jobCategoryValidate.jobCatgorySchemaValidation),
    JobCategoryController.postJobCategoryController,
);

export const JobCategoryRoutes: Router = router;
