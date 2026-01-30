import { Router } from "express";
import { getMovies, searchMovies } from "../controllers/movie.controller";
import { validateSearchMovie } from "../middlewares/validateSearchMovies.middleware";

const router = Router();
router.get("/movies", getMovies);
router.get("/movies/search", validateSearchMovie, searchMovies);

export default router;
