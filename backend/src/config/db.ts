import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Ychauhan@2102",
  database: "movie_explorer",
  waitForConnections: true,
  connectionLimit: 10,
});
