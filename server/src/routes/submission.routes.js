import { Router } from "express";
import {
    getSubmissions,
    submission
} from "../controller/submission.controller.js";

const router = Router();

router.route("/submit").post(submission);
router.route("/getSubmissions").get(getSubmissions);

export default router;
