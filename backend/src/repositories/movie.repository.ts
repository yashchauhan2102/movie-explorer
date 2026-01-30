import { pool } from "../config/db";
import { MovieEntity } from "../entities/movie.entity";
import { IMovie } from "../type/movie.type";

export async function findAll(): Promise<MovieEntity[]> {
  const [rows] = await pool.query(`
    SELECT * 
    FROM movies 
    ORDER BY created_at DESC
    `);

  return rows as MovieEntity[];
}

export async function searchByMovieTitle(
  searchTerm: string,
): Promise<MovieEntity[]> {
  const query = `
    SELECT *
    FROM movies
    where title LIKE ?
    `;

  const [rows] = await pool.query(query, [`%${searchTerm}%`]);

  return rows as MovieEntity[];
}

export async function saveMany(movies: IMovie[]): Promise<void> {
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
