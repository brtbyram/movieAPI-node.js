const express = require("express");
const router = express.Router();
const { getDirectors, postDirectors } = require("../controllers/directorController");

router.get("/", getDirectors);
router.post("/", postDirectors);


module.exports = router;
