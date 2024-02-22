const express = require('express');
const router = express.Router();
const { postMovie, getMovies } = require('../controllers/movieController');

/* GET users listing. */
router.get('/', getMovies);

router.post('/', postMovie)

module.exports = router;
