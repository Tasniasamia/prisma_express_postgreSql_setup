import { globalService } from "@/utils/global.service"
import { jobCategory } from "./job-cateogory.interface"

export class JobCategoryService{
    static createJobCategory=async(payload:jobCategory)=>{
     const existCategory=await globalService.existDocument({query:{name:payload?.name},select:{},model:'JobCategory',shouldExist:false,isError:true,errorMessages:"",include:true});
     const createCategory=await globalService.createDocument({data:payload,model:'JobCategory'});
     return createCategory;
    }
}