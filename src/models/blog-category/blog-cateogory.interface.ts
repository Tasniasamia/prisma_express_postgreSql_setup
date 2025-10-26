export interface blogCategory{
    name:Record<string,string>,
    description:Record<string,string>,
    status:boolean
}
export interface updateblogCategory extends blogCategory{
    id:string | any,
 
}