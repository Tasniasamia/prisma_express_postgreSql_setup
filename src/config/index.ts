import dotenv from 'dotenv';
import path from 'node:path';
// const envPath: string = path.join(
//     __dirname,
//     '../../../',
//     `.env.${process.env.NODE_ENV}`,
// );
dotenv.config();
export default {
    db_URL: process.env.DATABASE_URL,
    port: process.env.PORT ,
    node_env:process.env.NODE_ENV || 'development'
   
};
