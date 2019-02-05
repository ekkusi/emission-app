const mongoose = require('./../../mongoose');
const { Record } = require('./../../models/record');
const { Area } = require('./../../models/area');

// Initialize database with given records. Records must be in form contain
// attributes name, key, year, emission and population
const initializeDb = (records) => {
  return new Promise((resolve, reject) => {
    // Clear db first (updating all records)
    Record.deleteMany({}).then((res) => {
      console.log(`Deleted ${res.n} records`);
      return Area.deleteMany({});
    }).then((res) => {
      console.log(`Deleted ${res.n} areas`);
      return Promise.all(records.map((record) => {
        // Two promises from each record, one for area and one for record.
        // Areas will only be added if they dont yet exist (no duplicates).
        const areaPromise = new Promise((resolve, reject) => {
          new Area({
            name: record.name,
            key: record.key
          }).save().then((doc) => {
            console.log(`Added area (${doc.name})`);
            resolve(doc);
          }, (error) => {
            // Mongoose schema handles duplicates
            resolve("Already exists in db");
          })
        })
        const recordPromise = new Promise((resolve, reject) => {
          new Record({
            year: record.year,
            population: record.population,
            emission: record.emission,
            area: record.key,
          }).save().then((doc) => {
            console.log(`Added record for ${doc.area}  (${doc.year})`);
            resolve(doc);
          }, (error) => {
            console.log(`Something happened ${error}`);
            resolve(error);
          })
        })
        return Promise.all([areaPromise, recordPromise]);
      }));
    }).then((records) => {
      mongoose.connection.close()
      resolve(records);
    }).catch((e) => {
      mongoose.connection.close()
      reject(e);
    });
  });
};

module.exports = {
  initializeDb
}