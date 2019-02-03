const express = require('express');

const { Record } = require('../models/record');
const { Area } = require('../models/area');

const recordRoute = express();

recordRoute.route('/:area')
  .get((req, res) => {
    Area.findOne({ name: req.params.area.trim() }).then((area) => {
      if (!area) {
        return Promise.reject({ status: 404, error: "Area not found for given name"});
      }
      return area;
    }).then((area) => {
      return Record.find({ area: area.key });
    }).then((records) => {
      if (records.length === 0) {
        return Promise.reject({ status: 404, error: "No records found for given area"});
      }
      return res.send({ records: records.sort((a, b) => a.year - b.year) });
    }).catch((e) => {
      if (e.status) {
        return res.status(e.status).send({error: e.error});
      }
      res.status(400).send()
    }, (error) => {
      return res.status(400).send();
    });
  })

recordRoute.route('/:area/:startYear/:endYear')
  .get((req, res) => {
    // If startYear or endYear are not specifiec, they will pass condition without breaking the query
    const startYear = isNaN(parseInt(req.params.startYear)) ? Number.MIN_VALUE : parseInt(req.params.startYear);
    const endYear = isNaN(parseInt(req.params.endYear)) ? Number.MAX_VALUE : parseInt(req.params.endYear);
    Area.findOne({ name: req.params.area.trim() }).then((area) => {
      if (!area) {
        return Promise.reject({ status: 404, error: "Area not found for given name"});
      }
      return area;
    }).then((area) => {
      return Record.find({ 
        area: area.key, 
        year: { $gte: startYear, $lte: endYear }
      });
    }).then((records) => {
      if (records.length === 0) {
        return Promise.reject({ status: 404, error: "No records found with given information"});
      }
      // records = records.filter((record) => {
      //   return ((record.year >= startYear || isNaN(startYear)) && (record.year <= endYear || isNaN(endYear)));
      // })
      return res.send({ records: records.sort((a, b) => a.year - b.year) });
    }).catch((e) => {
      if (e.status) {
        return res.status(e.status).send({error: e.error});
      }
      res.status(400).send()
    }, (error) => {
      return res.status(400).send();
    });
  })

module.exports = recordRoute;