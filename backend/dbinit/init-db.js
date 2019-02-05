const fs = require('fs');
const xml2js = require('xml2js');
const { promisify } = require('util');

const { initializeDb } = require('./utils/dbinit');

const parser = new xml2js.Parser();
const readFile = promisify(fs.readFile);

// ==== Creating records ====
// Requires emissions and populations data to be in data-folder in files world-emissions.xml and world-population
let records;
readFile(__dirname + '/data/world-emissions.xml').then((data) => {
  parser.parseString(data, (err, result) => {
    // Filter out records, which don't have name, key, year and emission defined
    const filteredArray = result.Root.data[0].record.filter((record) => {
      return (record.field[0]._ && record.field[2]._ && record.field[3]._);
    });
    records = filteredArray.map((record) => {
      return {
        name: record.field[0]._,
        key: record.field[0].$.key,
        year: record.field[2]._,
        emission: Math.round(record.field[3]._)
      }
    });
  });
}).then(() => {
  return readFile(__dirname + '/data/world-population.xml')
}).then((data) => {
  // Add populations to records and filter records which don't get population
  parser.parseString(data, (err, result) => {
    result.Root.data[0].record.forEach((record) => {
      const matchingRecord = records.find((obj) => (obj.key === record.field[0].$.key && obj.year === record.field[2]._));
      if (matchingRecord && record.field[3]._) {
        matchingRecord.population = record.field[3]._;
      }
    });
    records = records.filter((record) => record.population);
  });
}).then(() => {
  // Add records to db (clears existing records first to update all)
  return initializeDb(records);
}).then((records) => {
  console.log(`Added ${records.length} records`);
  process.exit();
}).catch((err) => {
  console.log('Something happened', err);
  process.exit(1);
});