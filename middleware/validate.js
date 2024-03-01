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

const saveMotorcycle = (req, res, next) => {
    const validationRule = {
        brand: 'required|string',
        model: 'required|string',
        year: 'required|integer',
        color: 'required|string',
        type: 'required|string',
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
    saveMovie, saveMotorcycle
};
