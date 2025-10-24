export interface User {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
  role?: "ADMIN" | "USER" | "TEACHER";
  country?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  address?: string;
  about?: string;
}

export interface Course {
  id?: string;
  name?: Record<string, string>; 
  price?: number;
  rate?: number;
  description?: Record<string, string>;
  duration?: string;
  time?: string;
  days?: Record<string, Record<string, string>>; 
  place?: string;
  createdAt?: Date;
  sit?: number;
  enrollment?: number;
  status?: boolean;
  image?: string;
  categoryId?: string;
  currency_code?: string;
  currency_symbol?: string;

  instructorIds?: string[]; 
  instructors?: User[]; 
}

export interface UpdateCourse extends Course {
  id: string;
}
