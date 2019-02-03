const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
    min: 1
  },
  emission: {
    type: Number,
    required: true,
  },
  population: {
    type: Number,
    required: true,
    min: 1
  },
  area: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 3
  }
});

recordSchema.index({ year: 1, area: 1}, { unique: true });

const Record = mongoose.model('Record', recordSchema);

module.exports = {
  Record
}