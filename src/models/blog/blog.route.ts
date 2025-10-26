import { validate } from "@/middlewares/validate";
import { isVerifyAdmin } from "@/middlewares/verifyToken";
import { Router } from "express";
import { blogController } from "./blog.controller";
import { createBlogZodSchema, updateBlogZodSchema } from "./blog.validate";

const router = Router();
router.post('/',isVerifyAdmin,validate(createBlogZodSchema),blogController.postblogController);
router.get('/public',blogController.findblogControllerPublic);
router.get('/',isVerifyAdmin,blogController.findblogControllerAdmin);
router.put('/',isVerifyAdmin,validate(updateBlogZodSchema),blogController.updateblogController);
router.delete('/',isVerifyAdmin,blogController.deleteblogController);


export const blogRoutes: Router = router;
