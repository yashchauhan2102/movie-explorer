import { NextFunction, Request, Response } from "express";
import { getHealthStatus } from "../services/health.service";
import { asyncHandler } from "../utils/asyncHandler";

export const healthCheck = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const health = getHealthStatus();
    res.status(200).json(health);
  }
);
