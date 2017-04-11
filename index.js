require('dotenv').config();

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();
const events = require('./events/index');
const oauth = require('./oauth/index');

app.use(session({
  secret: 'anything',
  resave: false,
  saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(`${process.env.SERVER_EVENTS_PATH}`, events);
app.use(`${process.env.SERVER_OAUTH_PATH}`, oauth);


app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Authed as: ${req.user.username}, ${req.user.displayName}`);
  } else {
    res.redirect('/oauth/github');
  }
});


app.listen(process.env.SERVER_PORT || 3000, err => {
  if (err) {
    throw error;
  }

  console.log(`Server is running on localhost:${process.env.SERVER_PORT || 3000}`);
});
