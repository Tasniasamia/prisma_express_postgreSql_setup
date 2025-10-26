import { io } from "@/app";
import { db } from "@/config/db";
import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { success } from "zod";

export class MessageController {

    static markAsRead = catchAsync(async (req: Request, res: Response) => {
        const { decoded } = req.body;
        const { messageIds, friendId } = req.body;
        
        const currentUserId = decoded?.id;
    
        let updateResult;
    
        if (messageIds && messageIds.length > 0) {
          // Mark specific messages as read
          updateResult = await db.message.updateMany({
            where: {
              id: { in: messageIds },
              to: currentUserId, // Only mark messages sent to current user
              isRead: false // Only update unread messages
            },
            data: {
              isRead: true
            }
          });
        } else if (friendId) {
          // Mark all messages from a specific friend as read
          updateResult = await db.message.updateMany({
            where: {
              from: friendId,
              to: currentUserId,
              isRead: false
            },
            data: {
              isRead: true
            }
          });
    
          io.to(friendId).emit('messagesRead', {
            readerId: currentUserId,
            friendId: friendId,
            count: updateResult.count
          });
        } else {
          return res.status(400).json({
            success: false,
            message: 'Either messageIds or friendId is required'
          });
        }
    
        res.status(200).json({
          success: true,
          message: 'Messages marked as read successfully',
          data: {
            updatedCount: updateResult.count
          }
        });
      });
    
      // Get unread messages count
      static getUnreadCount = catchAsync(async (req: Request, res: Response) => {
        const { decoded } = req.body;
        const currentUserId = decoded?.id;
    
        const unreadCount = await db.message.count({
          where: {
            to: currentUserId,
            isRead: false
          }
        });
    
        // Count unread messages by each friend
        const unreadByFriend = await db.message.groupBy({
          by: ['from'],
          where: {
            to: currentUserId,
            isRead: false
          },
          _count: {
            id: true
          }
        });
    
        res.status(200).json({
          success: true,
          message: 'Unread count fetched successfully',
          data: {
            totalUnread: unreadCount,
            unreadByFriends: unreadByFriend
          }
        });
      });
    
      // Mark all messages as read
      static markAllAsRead = catchAsync(async (req: Request, res: Response) => {
        const { decoded } = req.body;
        const currentUserId = decoded?.id;
    
        const updateResult = await db.message.updateMany({
          where: {
            to: currentUserId,
            isRead: false
          },
          data: {
            isRead: true
          }
        });
    
        res.status(200).json({
          success: true,
          message: 'All messages marked as read successfully',
          data: {
            updatedCount: updateResult.count
          }
        });
      });
    


  static postMessage = catchAsync(async (req: Request, res: Response) => {
    const { from, to, messageType, message, isRead } = req.body;
    const createMessage = await db.message.create({
      data: {
        from,
        to,
        isRead,
        messageType: {
          create: {
            type: messageType,
            message,
          },
        },
      },
      include: {
        messageType: true,
      },
    });
    if (createMessage?.id) {
      io.to(to).emit('chatMessage', createMessage);
      io.to(from).emit('chatMessage', createMessage);
    }

    res.status(201).json({
      success: true,
      message: "Message created successfully",
      data: createMessage,
    });
  });
 // For pagination in getAllMessages
 static getAllMessages = catchAsync(async (req: Request, res: Response) => {
    const { decoded } = req.body;
    
    const findAllMessages = await db.message.findMany({
      where: {
        OR: [
          { from: decoded?.id },
          { to: decoded?.id }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        messageType: true
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Messages fetched successfully',
      data: findAllMessages
    });
  });


  static findAllFriends = catchAsync(async (req: Request, res: Response) => {
    const { decoded } = req.body;
    const currentUserId = decoded?.id;
    
    // Step 1: Get all friends with their complete details from user model
    const friendsData = await db.messageFriend.findMany({
      where: { 
        accountId: currentUserId 
      },
      include: {
        friends: true // This will include all fields from user model
      }
    });
  
    // Step 2: Extract friend IDs for message query
    const friendIds = friendsData.map(friend => friend.friendId);
  
    // Step 3: Get all messages between current user and these friends
    const allMessages = await db.message.findMany({
      where: {
        OR: [
          { from: currentUserId, to: { in: friendIds } },
          { from: { in: friendIds }, to: currentUserId }
        ]
      },
      include: {
        messageType: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  
    // Step 4: Create a map to find last message for each friend
    const lastMessageMap = new Map();
    
    allMessages.forEach(message => {
      // Determine the friend ID in this conversation
      const friendId = message.from === currentUserId ? message.to : message.from;
      
      // If we haven't set a last message for this friend yet, set it
      // Since messages are ordered by createdAt desc, first one we find is the last message
      if (!lastMessageMap.has(friendId)) {
        lastMessageMap.set(friendId, message);
      }
    });
  
    // Step 5: Create the final friends array with last messages
    const friendsWithLastMessages = friendsData.map(friendItem => {
      const friendId = friendItem.friendId;
      const lastMessage = lastMessageMap.get(friendId);
      
      // Create friend object with all details and last message
      return {
        id: friendItem.friends.id,
        name: friendItem.friends.name,
        email: friendItem.friends.email,
        image: friendItem.friends.image,
        phone: friendItem.friends.phone,
        role: friendItem.friends.role,
        country: friendItem.friends.country,
        city: friendItem.friends.city,
        state: friendItem.friends.state,
        zip_code: friendItem.friends.zip_code,
        address: friendItem.friends.address,
        about: friendItem.friends.about,
        is_deleted: friendItem.friends.is_deleted,
        createdAt: friendItem.friends.createdAt,
        lastMessage: lastMessage ? {
          id: lastMessage.id,
          from: lastMessage.from,
          to: lastMessage.to,
          isRead: lastMessage.isRead,
          createdAt: lastMessage.createdAt,
          messageType: lastMessage.messageType
        } : null
      };
    });
  
    return res.status(200).json({
      success: true,
      message: 'Friends with last messages fetched successfully',
      data: {
        friends: friendsWithLastMessages
      }
    });
  });

}