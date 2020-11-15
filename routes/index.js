var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Veuillez vous connecter' });
});


/* Dashboard. */
router.get('/dashboard', function(req, res, next) {
  if (req.session.admin && req.session.admin.id) {
    res.render('home', { title: 'Votre tableau de board', admin: req.session.admin });
    console.log(req.session.admin);
  } else {
    res.redirect("/");
  }
});

/** Scanner */
router.get('/scan', function(req, res, next) {
  if (req.session.admin && req.session.admin.id) {
    res.render('scan', { title: 'Scanner' });
  } else {
    res.redirect("/");
  }
});

/** Déconnexion */
router.get('/logout', function (req, res, next) {
  if (req.session.admin && req.session.admin.id) {
    delete req.session.admin;
  } else {
    res.redirect("/");
  }
  
  res.redirect("/");

})

module.exports = router;
