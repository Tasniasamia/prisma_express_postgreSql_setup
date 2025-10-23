export interface JobOptions {
    title: Record<string, string>
    company_name: Record<string, string>
    job_position: Record<string, string>
    categoryId: string
    category?: any
    vacancy?: number
    job_context?: Record<string, string>
    job_responsibility?: Record<string, string>
    educational_requirement?: Record<string, string>
    additional_requirements?: Record<string, string>
    salary?: number
    deadLine?: string | Date
    status: boolean
    jobType: string
    author_name: Record<string, string>
    job_location?: Record<string, string>
  }
  
  export interface UpdateJob extends JobOptions {
    id: string
  }
  