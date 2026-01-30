import { RequestHandler } from "express";

export const validateSearchMovies: RequestHandler = (req, res, next) => {
  const { searchTerm, type } = req.query;

  if (typeof searchTerm !== "string" || searchTerm.trim().length < 3) {
    return res.status(400).json({
      message: "search term must be a string with at least 3 characters.",
    });
  }

  // if (type && type !== "movie" && type !== "series" && type !== "episode") {
  //   return res.status(400).json({
  //     message: "type must be movie, series, or episode",
  //   });
  // }
  next();
};
