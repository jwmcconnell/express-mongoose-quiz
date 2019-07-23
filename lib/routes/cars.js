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
  })
  .get('/:id', (req, res, next) => {
    Car
      .findById(req.params.id)
      .then(car => res.send(car))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    const { make, model, year, power } = req.body;

    Car
      .findByIdAndUpdate(req.params.id, { make, model, year, power }, { new: true })
      .then(car => res.send(car))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Car
      .findByIdAndDelete(req.params.id)
      .then(car => res.send(car))
      .catch(next);
  })
