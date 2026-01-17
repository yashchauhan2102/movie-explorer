import { Router } from "express";
import { getMovies } from "../controllers/movie.controller";

const router = Router();
router.get("/movies", getMovies);

export default router;
