const express = require('express');

const router = express.Router();

const movieController = require('../controllers/movie');

router.get('/trending/', movieController.getMoviesTrending);
router.get('/trending/:page', movieController.getMoviesTrending);

router.get('/top-rate', movieController.getMoviesTopRate);
router.get('/top-rate/:page', movieController.getMoviesTopRate);

router.get('/discover/:genreId/:page', movieController.getMoviesDiscover);
router.get('/discover/:genreId', movieController.getMoviesDiscover);
router.get('/discover/', movieController.getMoviesDiscover);

router.get('/video/:movieId', movieController.getMovieTrailer);
router.get('/video', movieController.getMovieTrailer);

router.get('/search/:keyword', movieController.getMovieSearch);
router.get('/search/', movieController.getMovieSearch);

router.get('/movieId/:id', movieController.getMovieId);

router.get('/searchMovies/:page', movieController.getMovieMultiSearch);

module.exports = router;
