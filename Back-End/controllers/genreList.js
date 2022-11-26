const genreList = require('../models/genreList');

exports.getGenreList = (req, res, next) => {
  genreList.fetchAll(genreList => res.send(genreList));
};
