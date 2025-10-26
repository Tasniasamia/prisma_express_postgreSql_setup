import { validate } from "@/middlewares/validate";
import { isVerify, isVerifyAdmin } from "@/middlewares/verifyToken";
import { Router } from "express";
import { blogController } from "./blog.controller";
import {
  createBlogZodSchema,
  createCommentValidationSchema,
  createReplyValidationSchema,
  updateBlogZodSchema,
} from "./blog.validate";

const router = Router();
router.post(
  "/",
  isVerifyAdmin,
  validate(createBlogZodSchema),
  blogController.postblogController
);
router.get("/public", blogController.findblogControllerPublic);
router.get("/", isVerifyAdmin, blogController.findblogControllerAdmin);
router.put(
  "/",
  isVerifyAdmin,
  validate(updateBlogZodSchema),
  blogController.updateblogController
);
router.delete("/", isVerifyAdmin, blogController.deleteblogController);
router.post(
  "/comment",
  isVerify,
  validate(createCommentValidationSchema),
  blogController.createBlogComment
);
router.post(
  "/reply",
  isVerify,
  validate(createReplyValidationSchema),
  blogController.createBlogReply
);

export const blogRoutes: Router = router;
