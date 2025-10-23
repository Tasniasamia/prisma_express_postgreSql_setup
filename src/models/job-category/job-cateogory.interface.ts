export interface jobCategory{
    name:Record<string,string>,
    description:Record<string,string>,
    status:boolean
}
export interface updatejobCategory{
    id:string | any,
    name:Record<string,string>,
    description:Record<string,string>,
    status:boolean
}