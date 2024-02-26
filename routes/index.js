const express = require("express");
const router = express.Router();
const { register, authenticate } = require("../controllers/userController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/register", register);
router.post("/authenticate", authenticate);

module.exports = router;
