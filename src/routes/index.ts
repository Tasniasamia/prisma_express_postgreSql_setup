import { ApplyJobRoutes } from "@/models/applyJob/apply.job.route";
import { authRoutes } from "@/models/auth/auth.route";
import { JobCategoryRoutes } from "@/models/job-category/job-category.route";
import { JobRoutes } from "@/models/job/job.route";
import { otpRoutes } from "@/models/otp/otp.route";
import { languageRoutes } from "@/models/setting-language/setting.language.route";
import { settingRoute } from "@/models/settings/settings.route";
import { teacherRoutes } from "@/models/teacher/teacher.route";
import { userRoutes } from "@/models/user/user.route";
import { Router } from "express";


   const route=Router();
   const  allRoutes:{path:string,routes:any}[]=[
    {
        path:'/user',
        routes:userRoutes
    },
    {
        path:'/setting',
        routes:settingRoute
    },
    {
        path:'/otp',
        routes:otpRoutes
    },
    {
        path:'/auth',
        routes:authRoutes
    },
    {
        path:'/language',
        routes:languageRoutes
    },
    {
        path:"/job-category",
        routes:JobCategoryRoutes,
    },
    {
        path:'/job',
        routes:JobRoutes,
    },
    {
        path:'/applyJob',
        routes:ApplyJobRoutes
    },
    {
        path:'/teacher',
        routes:teacherRoutes
    }
]
allRoutes?.forEach((i,index)=>{
    route.use(i?.path,i?.routes)
})

export default route;