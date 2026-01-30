import { RequestHandler } from "express";

export const validateSearchMovie: RequestHandler = (req, res, next) => {
  const searchTerm = req.query.search;

  if (!searchTerm) {
    return res.status(400).json({ message: "search term is required" });
  }

  if (typeof searchTerm !== "string") {
    return res.status(400).json({
      message: "searchTerm must be a string",
    });
  }

  const trimmed = searchTerm.trim();

  if (trimmed.length < 3) {
    return res.status(400).json({
      message: "searchTerm must be at least 3 characters",
    });
  }

  req.query.searchTerm = trimmed;
  next();
};
