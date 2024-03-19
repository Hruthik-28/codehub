import asyncHanlder from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import axios from "axios";
import { pool } from "../index.js";
import axiosInstance from "../utils/axiosInstance.js";

function getLanguageId(code_language) {
    const languageIds = {
        "C++": 52,
        "Java": 62,
        "JavaScript": 63,
        "Python": 71,
    };

    if (languageIds.hasOwnProperty(code_language)) {
        return languageIds[code_language];
    } else {
        console.error(`Language ID not found for ${code_language}`);
        return null;
    }
}

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

    // get language_id
    const language_id = getLanguageId(code_language);

    const data = {
        language_id,
        source_code,
        stdin
    };
    // Generate a token for source_code using Judge0
    const response_one = await axiosInstance.post("/submissions", data);
    const token = response_one?.data?.token;

    if (!token) {
        throw new ApiError(500, "Failed to generate token");
    }

    let stdout;
    // extract stdout using token from Judge0
    const response_two = await axiosInstance.get(`/submissions/${token}`);
    stdout = response_two?.data.stdout;

    // save all the details with stdin and stdout in the DB
    const result = await pool.query(
        "INSERT INTO submissions (username, code_language, stdin, stdout, source_code) VALUES (?, ?, ?, ?, ?)",
        [username, code_language, stdin, stdout, source_code]
    );
    if (result?.length === 0) {
        throw new ApiError(500, "Error executing SQL query");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, result, "Submission Successfull"));
});

export const getSubmissions = asyncHanlder(async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM submissions");

    if (rows.length === 0) {
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "No Submissions available"));
    }

    // iterate thruough rows to limit rows.source_code to 100 chars
    const limitedResult = rows?.map((row) => {
        return {
            ...row,
            source_code: row.source_code.substring(0, 100)
        };
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                limitedResult,
                "Submissions fetched successfully"
            )
        );
});
