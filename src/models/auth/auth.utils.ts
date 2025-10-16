import bcrypt from 'bcrypt'
import jwt ,{PrivateKey, Secret, SignOptions} from 'jsonwebtoken';
import { StringValue } from 'ms';

const generateHashPassword=async(password:string):Promise<string|any>=>{
const generateHash=await bcrypt.hash(password,10);
return generateHash;

}
const passwordVerify=async(hashPassword:string,password:string):Promise<string|any>=>{
    const verifyPassword=await bcrypt.compare(password,hashPassword);
    return verifyPassword;
}

const generateToken=async(payload:string | object | Buffer<ArrayBufferLike>):Promise<string|any>=>{
    const access_token_secret:Secret | PrivateKey = process.env.ACCESS_TOKEN_SECRET || '';
    const expireTime= (process.env.EXPIREIN || '2d') as StringValue
    const token= await jwt.sign(payload,access_token_secret,{ expiresIn:expireTime });
    return token
}

const generateRefreshToken=async(payload:string | object | Buffer<ArrayBufferLike>):Promise<string|any>=>{
    const access_token_secret:Secret | PrivateKey = process.env.REFRESH_TOKEN_SECRET || '';
    const expireTime= (process.env.REFRESH_EXPIRY || '4d') as StringValue
    const token= jwt.sign(payload,access_token_secret,{ expiresIn:expireTime });
    return token
}

const verifyToken=async(token:Secret | PrivateKey | any,tokenType:'access'|'refresh')=>{
    const secretdata: string| any= (tokenType==="refresh") ? process.env.REFRESH_TOKEN_SECRET :process.env.ACCESS_TOKEN_SECRET || '';
    const payload= jwt.verify(token,secretdata);
    return payload;
}
export {generateHashPassword,passwordVerify,verifyToken,generateRefreshToken,generateToken};