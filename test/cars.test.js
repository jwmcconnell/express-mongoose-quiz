require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

const Car = require('../lib/models/Car');

describe('cars routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let cars;
  beforeEach(async () => {
    const newCars = [
      {
        make: 'Toyota',
        model: 'Camry',
        year: 2019,
        power: 'Gas'
      },
      {
        make: 'Nissan',
        model: 'GTR',
        year: 2018,
        power: 'Gas'
      },
      {
        make: 'BMW',
        model: 'i8',
        year: '2019',
        power: 'Electric'
      }
    ];

    cars = await Car.create(newCars);
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates and returns a car', () => {
    return request(app)
      .post('/api/v1/cars')
      .send({
        make: 'volkswagen',
        model: 'GTI',
        year: 2015,
        power: 'Gas'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          make: 'volkswagen',
          model: 'GTI',
          year: 2015,
          power: 'Gas',
          __v: 0
        });
      });
  });

  it('returns a list of all cars', () => {
    return request(app)
      .get('/api/v1/cars')
      .then(res => {
        const carsJSON = JSON.parse(JSON.stringify(cars));
        expect(res.body).toEqual(expect.any(Array));
        carsJSON.forEach(car => {
          expect(res.body).toContainEqual(car);
        });
      });
  });

  it('returns a car by id', () => {
    return request(app)
      .get(`/api/v1/cars/${cars[0]._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: cars[0]._id.toString(),
          make: 'Toyota',
          model: 'Camry',
          year: 2019,
          power: 'Gas',
          __v: 0
        });
      });
  });
});
