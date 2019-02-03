const express = require('express');

const { Area } = require('../models/area');

const areaRoute = express();

areaRoute.route('/')
  .get((req, res) => {
    Area.find().then((areas) => {
      areas.sort((a, b) => (a.name >= b.name) ? 1 : -1);
      return res.send({ areas });
    }).catch((e) => {
      return res.status(400).send();
    })
  })

module.exports = areaRoute;