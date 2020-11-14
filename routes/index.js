var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Veuillez vous connecter' });
});


/* Dashboard. */
router.get('/dashboard', function(req, res, next) {
  res.render('home', { title: 'Votre tableau de board' });
});

/** Scanner */
router.get('/scan', function(req, res, next) {
  res.render('scan', { title: 'Scanner' });
});

module.exports = router;
