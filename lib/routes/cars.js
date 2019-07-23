const { Router } = require('express');
const Car = require('../models/Car');


module.exports = Router()
  .post('/', (req, res, next) => {
    const { make, model, year, power } = req.body;

    Car
      .create({ make, model, year, power })
      .then(car => res.send(car))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Car
      .find()
      .then(cars => res.send(cars))
      .catch(next);
  });
