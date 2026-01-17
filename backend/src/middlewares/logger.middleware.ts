import { RequestHandler } from "express";

export const requestLogger: RequestHandler = (req, res, next) => {
  console.log(`RequestLogger: ${req.method} ${req.url}`);
  next();
};
