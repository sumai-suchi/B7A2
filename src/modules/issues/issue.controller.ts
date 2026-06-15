import type { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import {  issueService } from "./issue.service";
import  type {User} from "../issues/issue.interface";

const createIssue= async (req : Request , res : Response)=>{

    try{
        console.log(req.body)
        const result = await issueService.createIssueIntoDB(req.body , req.user?.id as number);
        console.log(result)
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Issue created successfully",
            data: result.rows[0],
          });
    }
    catch(error : any){
        console.log(error)
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            data: error,
          });
    }
     
}

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const { sort, type, status } = req.query;

    const result = await issueService.getAllIssuesService({
      sort: sort as string,
      type: type as string,
      status: status as string,
    });

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issues retrieved successfully",
      data: result,
    });

  } catch (error : any) {
  

     return sendResponse(res, {
       statusCode: 400,
       success: false,
       message: error.message || "Something went wrong",
     })
  }
};


export const updateIssue = async (req: Request, res: Response) => {
  try {
    const issueId = Number(req.params.id);
    const user = req.user; // from auth middleware

    const result = await issueService.updateIssueService(issueId, user as User, req.body);

   return sendResponse(res, {
     statusCode: 200,
     success: true,
     message: "Issue updated successfully",
     data: result,
   })

  } catch (error: any) {
     return sendResponse(res, {
       statusCode: 400,
       success: false,
       message: error.message || "Something went wrong",
     })
  }
};



export const deleteIssue = async (req: Request, res: Response) => {
  try {
    const issueId = Number(req.params.id);

    const result = await issueService.deleteIssueService(issueId);
    // console.log(result);

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue deleted successfully",
      data: result,
    })
  } catch (error: any) {
     return sendResponse(res, {
       statusCode: 400,
       success: false,
       message: error.message || "Something went wrong",
     })
  }
};

export const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const issueId = Number(req.params.id);

    const result = await issueService.getSingleIssueService(issueId);

   sendResponse(res, {
     statusCode: 200,
     success: true,
     message: "Issue retrieved successfully",
     data: result,
   })

  } catch (error: any) {
     sendResponse(res, {
       statusCode: 400,
       success: false,
       message: error.message || "Something went wrong",
     })
  }
};







export const issueController={
    createIssue,
    getAllIssues,
    updateIssue,
    deleteIssue,
    getSingleIssue
}


