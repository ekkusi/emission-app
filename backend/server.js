const { connectRead } = require('./mongoose')
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const recordRoute = require('./routes/record');
const areaRoute = require('./routes/area');

connectRead();
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use('/api/record', recordRoute);
app.use('/api/area', areaRoute);

app.get("*", (req, res) => {
  console.log(path.join(__dirname, "..", "client", "build", "index.html"));
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app
};