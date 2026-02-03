import { RowDataPacket } from "mysql2";
import { pool } from "../config/db";
import { MovieEntity } from "../entities/movie.entity";
import { CreateMovie } from "../type/movie.type";

export async function findAll(): Promise<MovieEntity[]> {
  const [rows] = await pool.query(`
    SELECT * 
    FROM movies 
    ORDER BY created_at DESC
    `);

  return rows as MovieEntity[];
}

export async function searchByMovieTitlePaginated(
  searchTerm: string,
  limit: number,
  offset: number,
): Promise<{ movies: MovieEntity[]; total: number }> {
  const dataQuery = `
    SELECT *
    FROM movies
    where title LIKE ?
    ORDER BY year DESC
    LIMIT ? OFFSET ?;
  `;

  const countQuery = `
    SELECT COUNT(*) as total
    FROM movies
    WHERE title LIKE ?;
  `;

  const searchTitle = `%${searchTerm}%`;

  const [movies] = await pool.query(dataQuery, [searchTitle, limit, offset]);

  const [countResult] = await pool.query<RowDataPacket[]>(countQuery, [
    searchTitle,
  ]);

  const total = countResult[0].total;

  return {
    movies: movies as MovieEntity[],
    total: total,
  };
}

export async function saveMany(movies: CreateMovie[]): Promise<void> {
  if (movies.length === 0) return;

  const values = movies.map((movie) => [
    movie.title,
    movie.year,
    movie.poster,
    movie.imdb_id,
    movie.type,
    movie.imdb_rating,
  ]);

  await pool.query(
    `
    INSERT INTO movies (title, year, poster, imdb_id, type, imdb_rating)
    VALUES ?
    ON DUPLICATE KEY UPDATE imdb_id = imdb_id
    `,
    [values],
  );
}
