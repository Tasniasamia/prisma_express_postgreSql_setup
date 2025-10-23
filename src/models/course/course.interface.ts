export interface Course {
    id?: string;
    name?: Record<string, string>; // e.g. { "en": "Web Dev", "bn": "ওয়েব ডেভেলপমেন্ট" }
    price?: number;
    rate?: number;
    description?: Record<string, string>; // e.g. { "en": "Learn web", "bn": "ওয়েব শিখুন" }
    duration?: string;
    time?: string;
    days?: Record<string, Record<string, string>>; 
    // e.g. { monday: { en: "Morning", bn: "সকাল" }, tuesday: { en: "Evening", bn: "সন্ধ্যা" } }
  
    place?: string;
    createdAt?: Date;
    sit?: number;
    enrollment?: number;
    status?: boolean;
    image?: string;
    categoryId?: string;
  }
  
  export interface UpdateCourse extends Course {
    id: string;
  }
  