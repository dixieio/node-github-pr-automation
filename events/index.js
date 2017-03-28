const router = require('express').Router();
const github = require('./github/index');

router.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

router.post('/github', github);

module.exports = router;
