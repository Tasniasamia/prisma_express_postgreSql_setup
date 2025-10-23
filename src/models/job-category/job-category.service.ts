import { globalService } from "@/utils/global.service"
import { jobCategory } from "./job-cateogory.interface"
import { equal } from "assert";

export class JobCategoryService{
    static createJobCategory=async(payload:jobCategory)=>{
     const {name}= payload;
     const OR : any[]= Object.entries(name).map(([key,value])=>
     ({name:{path:[key] , equals:value}}))
     const query={OR}
     const existCategory=await globalService.existDocument({query:query,model:'JobCategory',shouldExist:false,isError:true,errorMessages:"",include:true});
     console.log('existCategory',existCategory)
     const createCategory=await globalService.createDocument({data:payload,model:'JobCategory'});
     return createCategory;
    }
}