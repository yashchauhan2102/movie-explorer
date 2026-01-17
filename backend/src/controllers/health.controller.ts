import { NextFunction, Request, Response } from "express";
import { getHealthStatus } from "../services/health.service";

export function healthCheck(req: Request, res: Response, next: NextFunction) {
  try {
    const health = getHealthStatus();
    res.status(200).json(health);
  } catch (err) {
    next(err);
  }
}
