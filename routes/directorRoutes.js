const express = require("express");
const router = express.Router();
const {
  getDirectors,
  postDirectors,
  getDirectorById,
  updateDirectorById,
  deleteDirectorById,
} = require("../controllers/directorController");

router.get("/", getDirectors);
router.post("/", postDirectors);
router.get("/:director_id", getDirectorById);
router.put("/:director_id", updateDirectorById);
router.delete("/:director_id", deleteDirectorById);

module.exports = router;
