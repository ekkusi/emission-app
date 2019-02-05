require('./mongoose')
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const recordRoute = require('./routes/record');
const areaRoute = require('./routes/area');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.use('/api/record', recordRoute);
app.use('/api/area', areaRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app
};