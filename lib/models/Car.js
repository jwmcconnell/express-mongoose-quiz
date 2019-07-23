const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true
  },
  make: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true,
    length: 4
  },
  power: {
    type: String,
    required: true,
    enum: ['Gas', 'Diesel', 'Hybrid', 'Electric'],
  }
});

module.exports = mongoose.model('Car', carSchema);
