export interface ICreateBlog {
    title: Record<string, string>;
    short_description: Record<string, string>;
    description?: Record<string, string>;
    categoryId: string;
    status?: boolean;
    image?: string;
    thumbnail?: string;
  }
  