const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('home', { loggedIn: req.session.loggedIn });
});

router.get('/login', async (req, res) => {
  res.render('login', { loggedIn: req.session.loggedIn });
});

router.get('/zuzka', async (req, res) => {
  res.render('zuzka', { loggedIn: req.session.loggedIn });
});

router.get('*', async (req, res) => {
  res.render('404', { loggedIn: req.session.loggedIn });
});

module.exports = router;
