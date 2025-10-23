import { validate } from "@/middlewares/validate";
import { isVerifyAdmin } from "@/middlewares/verifyToken";
import { Router } from "express";
import { createJobSchema } from "./job.validate";
import { JobController } from "./job.controlller";

const router = Router();
router.post('/',isVerifyAdmin,validate(createJobSchema),JobController.postJobController)

export const JobRoutes: Router = router;
