const router = require('express').Router();

router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/zuzka', async (req, res) => {
  res.render('zuzka');
});

router.get('*', async (req, res) => {
  res.render('404');
});

module.exports = router;
