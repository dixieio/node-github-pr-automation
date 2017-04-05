require('dotenv').config();
const router = require('express').Router();
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const Auth = require('./auths.js');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = Auth.getAuth(id, 'github');
  done(null, user);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_OAUTH_CALLBACK_URL
  },
  (accessToken, refreshToken, profile, cb) => {
    const user = {
      id: profile.id,
      type: 'github',
      accessToken: accessToken,
      refreshToken: refreshToken,
      username: profile.username,
      displayName: profile.displayName
    }

    Auth.setAuth(user);
    return cb(null, user);
  }
));

router.get('/github', passport.authenticate('github'));
router.get('/github/callback',
  passport.authenticate(
    'github',
    {
      successRedirect: '/',
      failureRedirect: '/oauth/github/error'
    }
  ),
  (req, res) => {
    return;
  }
);

//oauth/github/success

router.get('/github/success', (req, res) => {
  res.send(`Successfully authenticated as: ${req.user.displayName}`);
});

router.get('/github/error', (req, res) => {
  res.send(`Something went wrong, try again.`);
});

module.exports = router;
