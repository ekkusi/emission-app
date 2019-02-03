const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  key: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 3,
    unique: true
  }
});

const Area = mongoose.model('Area', areaSchema);

module.exports = {
  Area
}