import dotenv from "dotenv";
import { dbConnect } from "./db/dbConnect.js";
import app from "./app.js";
import redis from "./utils/redis.js";

dotenv.config({
    path: "./.env"
});

let pool;

dbConnect()
    .then((poolBySql) => {
        pool = poolBySql.promise();
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is listening on: ${process.env.PORT || 8000}`);
        });
    })
    .catch((error) => console.log("SQL DB Connection failed!!!: ", error));

export { pool };
