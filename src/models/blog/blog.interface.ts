export interface CreateBlog {
    title: Record<string, string>;
    short_description: Record<string, string>;
    description?: Record<string, string>;
    categoryId: string;
    status?: boolean;
    image?: string;
    thumbnail?: string;
  }
  export interface CreateComment {
    commentMessage: string;
    blogId: string;
  }
  export interface CreateReply {
    replyMessage: string;
    commentId: string;
    userId: string;
  }
  