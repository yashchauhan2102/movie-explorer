import express from "express";
import healthRouter from "./routes/health.route";
import { requestLogger } from "./middlewares/logger.middleware";
import { errorHandler } from "./middlewares/error.middleware";

export const app = express();

app.use(express.json());
app.use(requestLogger);

app.use("/api", healthRouter);

app.use(errorHandler);
