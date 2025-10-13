import dotenv from 'dotenv';
dotenv.config();
export default {
    db_URL: process.env.DATABASE_URL,
    port: process.env.PORT ,
    node_env:process.env.NODE_ENV || 'development'
   
};
