import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = new express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(morgan("dev"));

// import routes
import submissionRouter from "./routes/submission.routes.js";
import { healthCheck } from "./controller/test.controller.js";

app.use("/api/v1", submissionRouter);
app.use("/api/v1/health", healthCheck);

export default app;
