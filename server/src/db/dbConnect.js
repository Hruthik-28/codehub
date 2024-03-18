import mysql from "mysql2";

export const dbConnect = async () => {
    try {
        const pool = mysql.createPool({
            host: process.env.AWS_HOST,
            user: process.env.AWS_USER,
            password: process.env.AWS_PASSWORD,
            database: process.env.AWS_DATABASE,
            waitForConnections: true
        });
        if (pool) {
            console.log("SQL DB Connect Success !!!");
        }
        return pool;
    } catch (error) {
        console.log("SQL DB CONNECTION FAILED", error);
        process.exit(1);
    }
};
