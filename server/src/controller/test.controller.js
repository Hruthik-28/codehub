import asyncHanlder from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const healthCheck = asyncHanlder(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { message: "Healthcheck successfull" },
                "Healthcheck successfull"
            )
        );
});
