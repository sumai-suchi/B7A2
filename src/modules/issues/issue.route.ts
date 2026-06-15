import { Router } from "express";
import auth from "../../middleware/auth";
import { issueController } from "./issue.controller";

const router= Router()


router.post('/',auth("reporter","maintainer"),issueController.createIssue)
router.get('/',issueController.getAllIssues)
router.get("/:id", issueController.getSingleIssue);
router.patch('/:id',auth("maintainer"),issueController.updateIssue)
router.delete('/:id',auth("maintainer"),issueController.deleteIssue)





export const issueRoute=router
