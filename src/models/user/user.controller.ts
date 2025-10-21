import { catchAsync } from "@/utils/catchAsync";
import { Response, Request } from "express";
import { userService } from "./user.service";

export class userController {
  static getAllUserByAdmin = catchAsync(async (req: Request, res: Response) => {
    const query = req.query.search as string; 
    const getData = await userService.findAllUser(query);
    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      data: getData,
    });
  });
}
