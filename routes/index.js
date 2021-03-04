var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('index.html');
});

router.get('/signin', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('index.html');
});

router.get('/signup', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('index.html');
});

router.get('/wallet', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('index.html');
});

module.exports = router;
