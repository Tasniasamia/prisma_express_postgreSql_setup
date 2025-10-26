import { validate } from "@/middlewares/validate";
import { Router } from "express";
import { messageSchema } from "./message.validate";
import { MessageController } from "./message.controller";

const route = Router();

route.post('/', validate(messageSchema), MessageController.postMessage);
route.get('/all', MessageController.getAllMessages);
route.get('/friends', MessageController.findAllFriends);

route.patch('/mark-read', MessageController.markAsRead);
route.get('/unread-count', MessageController.getUnreadCount);
route.patch('/mark-all-read', MessageController.markAllAsRead);

export const messageRoute: Router = route;