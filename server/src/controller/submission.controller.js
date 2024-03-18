import asyncHanlder from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import axios from "axios";
import { pool } from "../index.js";
import axiosInstance from "../utils/axiosInstance.js";

export const submission = asyncHanlder(async (req, res) => {
    const { username, code_language, stdin, source_code } = req.body;

    // validation
    if (
        [username, code_language, stdin, source_code].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // Get language_id from languages table for respective language
    const [row] = await pool.query(
        "SELECT lang_id FROM languages WHERE lang_name = ?",
        [code_language?.toLowerCase()]
    );
    if (row.length === 0) {
        throw new ApiError(400, "Invalid code language");
    }

    // extract language_id
    const language_id = row[0].lang_id;

    //Create a submission and get the token for source_code from Judge0
    const response = await axiosInstance.post("/submissions", {
        language_id,
        source_code,
        stdin
    });
    const token = response?.token;

    // // save all the details with token in the DB
    const result = await pool.query(
        "INSERT INTO submissions (username, language_id, stdin, source_code, token) VALUES (?, ?, ?, ?)",
        [username, language_id, stdin, source_code, token]
    );
    if (result?.length === 0) {
        throw new ApiError(500, "Error executing SQL query");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, result, "Submission Successfull"));
});

export const getSubmissions = asyncHanlder(async (req, res) => {
    pool.query("SELECT * FROM submissions", (err, results) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            throw new ApiError(
                500,
                "An error occurred while processing your request"
            );
        }

        // iterate thruough results.source_code to limit it to 100 chars
        const limitedResult = results?.map((result) => ({
            ...result,
            source_code: result.source_code.substring(0, 3)
        }));

        res.status(200).json(
            new ApiResponse(
                200,
                limitedResult,
                "Submissions fetched successfully"
            )
        );
    });
});
