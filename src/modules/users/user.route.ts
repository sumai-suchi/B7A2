import { Router, type Request, type Response } from "express";
import { pool } from "../../db/database";
import { sendResponse } from "../../utils/sendResponse";
import { userController } from "./user.controller";

const router= Router();


router.post('/signup', userController.createUser)

export const  userRoute=router ;