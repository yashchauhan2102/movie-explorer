import { Router } from "express";
import { getMovies, searchMovies } from "../controllers/movie.controller";

const router = Router();
router.get("/movies", getMovies);
router.get("/movies/search", searchMovies);

export default router;
