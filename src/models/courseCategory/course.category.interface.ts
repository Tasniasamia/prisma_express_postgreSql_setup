export interface CourseCategory{
    name:Record<string,string>,
    description:Record<string,string>,
    status:boolean
}
export interface updateCourseCategory extends CourseCategory{
    id:string | any,
 
}