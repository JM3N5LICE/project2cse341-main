const validator = require('../helpers/validate');

const saveMovie = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    releaseDate: 'required|string',
    description: 'required|string',
    director: 'required|string',
    genre: 'required|string',
    rating: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveActor = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    age: 'required|string', // This ensures that likedMovies is an array, but not necessarily required
    movies: 'array' // This ensures that groups is an array, but not necessarily required
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveMovie,
  saveActor
};