import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { config } from "../config";
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { pool } from "../db/database";

const auth = (...roles : string[])=>
{
 
   return  async(req : Request, res : Response ,next : NextFunction) =>
   {
    console.log(roles)
     console.log(req.headers.authorization);
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);

    if(!token){
        return sendResponse(res, {statusCode: 401, success: false, message: 'Unauthorized token', data: null});
    }
    
    const decoded =jwt.verify(token as string ,config.secret as string ) as JwtPayload;

    if(!decoded){
        return sendResponse(res, {statusCode: 401, success: false, message: 'Unauthorized token', data: null});
    }

    const result = await pool.query(`SELECT * FROM users WHERE id=$1`,[decoded?.id])
    console.log("result",result.rows[0]);

     if(result.rows[0].length === 0){
        return sendResponse(res, {statusCode: 401, success: false, message: 'user not found', data: null});
    }


    const user =result.rows[0];

    if(roles.length && !roles.includes(user.role)){
        return sendResponse(res, {statusCode: 401, success: false, message: 'unauthorized user', data: null});
    }

   
   

    req.user = user

      
    next();
    
   }
}

export default auth