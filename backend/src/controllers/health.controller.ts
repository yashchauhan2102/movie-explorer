import { NextFunction, Request, Response } from "express";

export function healthCheck(req: Request, res: Response, next: NextFunction) {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}
