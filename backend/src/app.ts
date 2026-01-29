import express from "express";
import healthRoutes from "./routes/health.route";
import movieRoutes from "./routes/movie.route";
import { requestLogger } from "./middlewares/logger.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import cors from "cors";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.use(requestLogger);

app.use("/api", healthRoutes);
app.use("/api", movieRoutes);

app.use(errorHandler);
