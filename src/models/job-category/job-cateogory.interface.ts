export interface JobCategory{
    name:Record<string,string>,
    description:Record<string,string>,
    status:boolean
}
export interface updatejobCategory extends JobCategory{
    id:string | any,
 
}