const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '.env')});
const env = process.env;

mongoose.Promise = global.Promise;

module.exports = {
  connectRead: () => {
    mongoose.connect(env.MONGO_URI || 'mongodb://localhost:27017/EmissionApp', 
      { useNewUrlParser: true,
        user: env.MONGO_READ_USER || '',
        pass: env.MONGO_READ_PASSWORD || ''}).then(() => {
      console.log('Database is connected');
    }, (e) => {
      console.log(`Database connection failed: ${e}`);
    });
    return mongoose;
  },
  connectAdmin: () => {
    mongoose.connect(env.MONGO_URI || 'mongodb://localhost:27017/EmissionApp', 
      { useNewUrlParser: true,
        user: env.MONGO_ADMIN_USER || '',
        pass: env.MONGO_ADMIN_PASSWORD || '' }).then(() => {
      console.log('Database is connected');
    }, (e) => {
      console.log(`Database connection failed: ${e}`);
    });
    return mongoose;
  }
}