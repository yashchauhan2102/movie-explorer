import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("ErrorHandler: ", err);

  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
};
