const router = require('express').Router();
const github = require('./github/index');

router.use((req, res, next) => {
  console.log(`Incomming hook from Github, method: ${req.method}`);
  next();
});

router.post('/github', github);

module.exports = router;
