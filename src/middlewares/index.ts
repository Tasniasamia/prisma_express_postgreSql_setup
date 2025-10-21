import morgan from 'morgan';
import compression from 'compression';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from '@/config';
// import fileUpload from 'express-fileupload';

const customHeader = (
    _req: Request,
    res: Response,
    next: NextFunction,
): void => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    res.header('Access-Control-Allow-Methods', 'GET,POST, PUT, DELETE, OPTIONS');
    next();
};

const customJSON=( req: Request,
    res: Response,
    next: NextFunction,):void=>{
        if (req?.url.includes('orders/webhook')) {
            express.raw({ type: 'application/json' })(req, res, next);
          } else {
            express.json()(req, res, next);
          }
          
    }


const middleware = [
    morgan(config.node_env == 'dev' ? 'dev' : 'combined'),
    compression(),
    // fileUpload({
    //     limits: {
    //         fileSize: 50 * 1024 * 1024,
    //     },
    // }),
    customJSON,
    cookieParser(),
    express.urlencoded({ extended: true }),
    customHeader,
    cors({ credentials: true }),
];
export default middleware;
