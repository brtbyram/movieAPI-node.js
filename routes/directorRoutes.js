const express = require("express");
const router = express.Router();
const {
  getDirectors,
  postDirectors,
  getDirectorById,
} = require("../controllers/directorController");

router.get("/", getDirectors);
router.post("/", postDirectors);
router.get("/:director_id", getDirectorById);

module.exports = router;
