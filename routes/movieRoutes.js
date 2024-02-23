const express = require("express");
const router = express.Router();
const {
  postMovie,
  getMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById,
  getTop10Movies,
  getMoviesBetweenYears,
} = require("../controllers/movieController");

/* GET users listing. */
router.get("/", getMovies);
router.post("/", postMovie);
router.get("/top10", getTop10Movies);
router.get("/between/:start_year/:end_year", getMoviesBetweenYears);
router.get("/:movie_id", getMovieById);
router.put("/:movie_id", updateMovieById);
router.delete("/:movie_id", deleteMovieById);

module.exports = router;
