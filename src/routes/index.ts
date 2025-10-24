import { ApplyJobRoutes } from "@/models/applyJob/apply.job.route";
import { authRoutes } from "@/models/auth/auth.route";
import { CourseRoutes } from "@/models/course/course.route";
import { CourseCategoryRoutes } from "@/models/courseCategory/course.category.route";
import { currencyRoute } from "@/models/currency/currency.route";
import { JobCategoryRoutes } from "@/models/job-category/job-category.route";
import { JobRoutes } from "@/models/job/job.route";
import { otpRoutes } from "@/models/otp/otp.route";
import { paymentRoutes } from "@/models/payment/payment.route";
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
    },
    {
        path:'/course-category',
        routes:CourseCategoryRoutes
    },
    {
        path:'/course',
        routes:CourseRoutes
    },
    {
        path:'/currency',
        routes:currencyRoute
    },
    {
        path:"/payment",
        routes:paymentRoutes
    }
]
allRoutes?.forEach((i,index)=>{
    route.use(i?.path,i?.routes)
})

export default route;