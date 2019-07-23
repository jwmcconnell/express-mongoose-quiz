require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('cars routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
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
});
