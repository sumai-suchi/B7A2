import dotenv from "dotenv";
import express from "express";
import type { Application } from "express";

import { initDB } from "./db/database";
import { userRoute } from "./modules/users/user.route";
import { issueRoute } from "./modules/issues/issue.route";
import { sendResponse } from "./utils/sendResponse";

dotenv.config();

export const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

initDB();

app.get("/", (req, res) => sendResponse(res, { statusCode: 200, success: true, message: "Server is running", data: null }));


app.use("/api/auth", userRoute);
app.use("/api/issues", issueRoute);


