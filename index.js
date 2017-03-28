require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const events = require('./events/index');

app.use(bodyParser.json());
app.use(`${process.env.SERVER_EVENTS_PATH}`, events);

app.listen(process.env.SERVER_PORT || 3000, err => {
  if (err) {
    throw error;
  }

  console.log(`Server is running on localhost:${process.env.SERVER_PORT || 3000}`);
});
