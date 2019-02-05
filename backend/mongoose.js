const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '.env')});

mongoose.Promise = global.Promise;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/EmissionApp';

mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => {
  console.log('Database is connected');
}, (e) => {
  console.log(`Database connection failed: ${e}`);
});

module.exports = mongoose