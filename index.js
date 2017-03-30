require('dotenv').config();

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();
const events = require('./events/index');
const oauth = require('./oauth/index');

app.use(bodyParser.json());
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(`${process.env.SERVER_EVENTS_PATH}`, events);
app.use(`${process.env.SERVER_OAUTH_PATH}`, oauth);


app.listen(process.env.SERVER_PORT || 3000, err => {
  if (err) {
    throw error;
  }

  console.log(`Server is running on localhost:${process.env.SERVER_PORT || 3000}`);
});
