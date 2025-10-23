import { validate } from "@/middlewares/validate";
import { Router } from "express";
import { ApplyJobValidate } from "./apply.job.validate";
import { ApplyJobController } from "./apply.job.controller";
import { isVerify, isVerifyAdmin } from "@/middlewares/verifyToken";
import { upload } from "@/middlewares/multer";

const router = Router();


router.post(
  "/",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "cover_letter", maxCount: 1 },
  ]),
  isVerify,
  validate(ApplyJobValidate.applyJobValidation),
  ApplyJobController.postApplyJobController
);
router.get('/',isVerifyAdmin,ApplyJobController.findApplyJobControllerAdmin)

export const ApplyJobRoutes: Router = router;
