import { validate } from "@/middlewares/validate";
import { isVerifyAdmin } from "@/middlewares/verifyToken";
import { Router } from "express";
import { createJobSchema, updateJobSchema } from "./job.validate";
import { JobController } from "./job.controlller";

const router = Router();
router.post('/',isVerifyAdmin,validate(createJobSchema),JobController.postJobController);
router.get('/public',JobController.findJobControllerPublic);
router.get('/',isVerifyAdmin,JobController.findJobControllerAdmin);
router.put('/',isVerifyAdmin,validate(updateJobSchema),JobController.updateJobController);
router.delete('/',isVerifyAdmin,JobController.deleteJobController);


export const JobRoutes: Router = router;
