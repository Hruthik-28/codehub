import { Router } from "express";
import { healthCheck } from "../controller/test.controller";

const router = Router();

router.route("/submit").get(healthCheck)

export default router;
