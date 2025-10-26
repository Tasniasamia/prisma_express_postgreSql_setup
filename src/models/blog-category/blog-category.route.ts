import { validate } from "@/middlewares/validate";
import { isVerifyAdmin } from "@/middlewares/verifyToken";
import { Router } from "express";
import { blogCategoryValidate, updateblogCategoryValidate } from "./blog-category.validate";
import { blogCategoryController } from "./blog-category.controller";

const router = Router();

router.post(
    '/',
    isVerifyAdmin,
    validate(blogCategoryValidate.blogCatgorySchemaValidation),
    blogCategoryController.postBlogCategoryController,
);
router.put(
    '/',
    isVerifyAdmin,
    validate(updateblogCategoryValidate.updateblogCatgorySchemaValidation),
    blogCategoryController.updateblogCategoryController
)
router.get('/',blogCategoryController.findblogCategoryControllerPublic)
router.get('/admin',isVerifyAdmin,blogCategoryController.findblogCategoryController)
router.delete('/',isVerifyAdmin,blogCategoryController.deleteController)
export const blogCategoryRoutes: Router = router;
