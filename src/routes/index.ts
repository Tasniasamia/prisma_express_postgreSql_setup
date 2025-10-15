import { settingRoute } from "@/models/settings/settings.route";
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
    }
]
allRoutes?.forEach((i,index)=>{
    route.use(i?.path,i?.routes)
})

export default route;