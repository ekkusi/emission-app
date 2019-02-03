require('dotenv').config();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Users named read/admin in database
module.exports = {
  connectRead: () => {
    const mongoURI = `mongodb://read:${encodeURIComponent(process.env.MONGO_READ_PASSWORD) + process.env.MONGO_URI}` 
                    || 'mongodb://localhost:27017/EmissionApp';
    console.log(mongoURI);
    mongoose.connect(mongoURI, { useNewUrlParser: true });
    return mongoose;
  },
  connectAdmin: () => {
    const mongoURI = `mongodb://admin:${encodeURIComponent(process.env.MONGO_ADMIN_PASSWORD) + process.env.MONGO_URI}` 
                    || 'mongodb://localhost:27017/EmissionApp';
    console.log(mongoURI);
    mongoose.connect(mongoURI, { useNewUrlParser: true });
    return mongoose;
  }
}