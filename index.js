const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 6666;

const sess = {
  secret: 'mySession',
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use()
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
});
