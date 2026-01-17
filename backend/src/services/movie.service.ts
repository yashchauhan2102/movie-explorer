import { RowDataPacket } from "mysql2";
import { pool } from "../config/db";
import { MovieEntity } from "../entities/movie.entity";

export async function getAllMovies(): Promise<MovieEntity[]> {
  const [rows] = await pool.query<RowDataPacket[]>(`
    SELECT 
        id,
        imdb_id AS imdbId,
        title,
        year,
        type,
        poster,
        created_at AS createdAt
    FROM movies
    ORDER BY created_at DESC
    `);
  console.log(Array.isArray(rows), rows);

  return rows as MovieEntity[];
}
