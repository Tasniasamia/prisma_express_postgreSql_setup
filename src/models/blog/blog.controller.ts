import { AppError } from "@/errors/appError";
import { catchAsync } from "@/utils/catchAsync";
import { globalService } from "@/utils/global.service";
import { Request,Response } from "express";
import { includes, success } from "zod";

export class blogController{
    static postblogController = catchAsync(
        async (req: Request, res: Response) => {
          const payload = await req?.body;
          console.log("payload",payload);
          const { title } = payload;
          const OR: any[] = Object.entries(title).map(([key, value]) => ({
            title: { path: [key], equals: value },
          }));
          const query = { OR };
          const existCategory = await globalService.existDocument({
            query: query,
            model: "blog",
            shouldExist: false,
            isError: true,
            errorMessages: "",
            include: { category: true }
        });
          const createCategory = await globalService.createDocument({
            data: payload,
            model: "blog",
          });
          if (createCategory) {
           return res.status(200).json({
                success: true,
                statusCode:200,
                message: "blog created successfully",
              });
              
          }
          throw new AppError(
            400,
            "something went wrong ",
            "Failed to create blog "
          );
        }
      );

    static findblogControllerPublic = catchAsync(
        async (req: Request, res: Response) => {
          const {
            page = "1",
            limit = "8",
            search = "",
            langCode = "en",
          } = req.query as any;
      
          console.log("search", search);
      
          const OR: any[] = search
            ? [
                {
                  title: {
                    path: [langCode],
                    string_contains: search,
                    mode: "insensitive",
                  },
                }
              ]
            : [];
      
          const where: any = {
            status: true,
            ...(OR.length ? { OR } : {}),
          };
      
          const data = await globalService.getDocuments({
            model: "blog",
            filter: where,
            include: {
                category: true,
                comment: {
                  include: {
                    user: true, 
                    reply: {
                      include: {
                        user: true, 
                      },
                    },
                  },
                },
              }
              ,
            select: {},
            page: parseInt(page),
            limit: parseInt(limit),
          });
      
          res.status(200).json({
            success: true,
            message: "blogs fetched successfully",
            data,
          });
        }
      );
      
      static findblogControllerAdmin = catchAsync(
        async (req: Request, res: Response) => {
          const {
            page = "1",
            limit = "8",
            search = "",
            langCode = "en",
          } = req.query as any;
      
          console.log("search", search);
      
          const OR: any[] = search
            ? [
                {
                  title: {
                    path: [langCode],
                    string_contains: search,
                    mode: "insensitive",
                  },
                }
              ]
            : [];
      
          const where: any = {
            ...(OR.length ? { OR } : {}),
          };
      
          const data = await globalService.getDocuments({
            model:"blog",
            filter: where,
            include: {
                category: true,
                comment: {
                  include: {
                    user: true, 
                    reply: {
                      include: {
                        user: true, 
                      },
                    },
                  },
                },
              },
                          select: {},
            page: parseInt(page),
            limit: parseInt(limit),
          });
      
          res.status(200).json({
            success: true,
            message: "blogs fetched successfully",
            data,
          });
        }
      );
      static updateblogController = catchAsync(
        async (req: Request, res: Response) => {
          const payload = await req?.body;
          const { title } = payload;
          const OR: any[] = Object.entries(title).map(([key, value]) => ({
            title: { path: [key], equals: value },
          }));
          const query = { OR };
          const existCategory = await globalService.existDocument({
            query: query,
            model: "blog",
            shouldExist: true,
            isError: false,
            errorMessages: "",
            include: { category: true }
          });
          const updateCategory = await globalService.updateDocument({
            id: payload?.id,
            data: payload,
            model: "blog",
          });
          if (updateCategory) {
            return res
              .status(200)
              .json({
                success: true,
                statusCode: 200,
                message: "blog updated successfully",
              });
          }
          throw new AppError(
            400,
            "something went wrong ",
            "Failed to update blog "
          );
        }
      );
      static deleteblogController = catchAsync(async (req: Request, res: Response) => {
        const query: string | any = req?.query?.id;
        const deleteblog= await globalService.deleteDocument({
          id: query,
          model: "blog",
        });
        if (deleteblog) {
          return res.status(200).json({
            success: true,
            message: "blog deleted successfully",
            deleteblog,
          });
        }
        throw new AppError(
          400,
          "Something went wrong",
          "Failed to delete blog"
        );
      });
      static createBlogComment = async (req: Request, res: Response) => {
        try {
          const { commentMessage, blogId, userId, decoded } = req.body;
      
          // Blog and User exist check
          const findBlog = await globalService.findDocuments({
            model: 'blog',
            filter: { id: blogId },
            single: true,
        
          });
      
          const findUser = await globalService.findDocuments({
            model: 'user',
            filter: { id: userId },
            single: true,
          
          });
      
          if (!findBlog || !findUser) {
            throw new AppError(
              400,
              "Something went wrong",
              "No user or blog exists"
            );
          }
      
          // Token check
          if (decoded?.id !== userId) {
            throw new AppError(
              400,
              "Unauthorized user",
              "Token user ID and body user ID do not match"
            );
          }
      
          // Create new comment
          const createComment = await globalService.createDocument({
            data: {
              commentMessage,
              blogId,
              userId,
            },
            model: "comment",
          });
      
          if (createComment) {
            return res.status(200).json({
              success: true,
              message: "Comment created successfully",
              data: createComment,
            });
          }
      
          throw new AppError(
            400,
            "Something went wrong",
            "Failed to create comment"
          );
      
        } catch (error: any) {
          console.error("createBlogComment error:", error);
      
          // ✅ This part was missing — now sends error response
          return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
            errorMessage: error?.errorMessage || "Something went wrong",
          });
        }
      };
      static createBlogReply = async (req: Request, res: Response) => {
 
          const { replyMessage, commentId, userId, decoded } = req.body;
          console.log("Decoded:", decoded, "UserId:", userId);
      
          const findComment = await globalService.findDocuments({
            model: "comment",
            filter: { id: commentId },
            single: true,
          });
      
          const findUser = await globalService.findDocuments({
            model: "user",
            filter: { id: userId },
            single: true,
          });
      
          if (!findComment || !findUser) {
            throw new AppError(400, "Something went wrong", "No user or comment exists");
          }
      
          if (decoded?.id !== userId) {
            throw new AppError(400, "Unauthorized user", "Token user ID and body user ID do not match");
          }
      
          const createReply = await globalService.createDocument({
            data: { replyMessage, commentId, userId },
            model: "reply",
          });
      
          if (createReply) {
            return res.status(200).json({
              success: true,
              message: "Reply created successfully",
              data: createReply,
            });
          }
      
          throw new AppError(400, "Something went wrong", "Failed to create reply");
        
      };
      
}