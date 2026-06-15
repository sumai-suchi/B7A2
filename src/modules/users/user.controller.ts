import type { Request, Response } from "express";

import { sendError, sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserIntoDB(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
     
    });
  } catch (error: any) {
    
    sendError(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      errors: error,
    });
  }
};

const login=async( req : Request , res : Response)=>{

    const {email, password}= req.body
    try{
         const result = await userService.userLogin(email, password)
         console.log(result)

         sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Login successful",
            data: result,
          });
    }
    catch(error : any){
        console.log(error)
        sendError(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            errors: error,
          });
    }
}

export const userController = {
  createUser,
  login
};
