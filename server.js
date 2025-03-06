const express = require('express');
const path = require('path');
const session = require('express-session');
const users = require('./views/JSON/date.json');

const information = {
  info: "Pentru logare",
  info2: "admin",
  info3: "admin"
};

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());

app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  res.status(200).render('index');
});

app.get('/login/', (req, res) => {
  res.status(200).render('login', { information });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    req.session.authenticated = true;
    res.redirect('/');
  } else {
    res.send('Autentificare eșuată. Verifică numele de utilizator și parola.');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.error(err);
    res.redirect('/login');
  });
});

function requireLogin(req, res, next) {
  req.session.authenticated ? next() : res.redirect('/login');
}

app.get('/protected', requireLogin, (req, res) => {
  res.send('Pagina protejată. Doar utilizatorii autentificați pot accesa această pagină.');
});

app.get('/users', (req, res) => {
  res.render('users');
});

app.get('/api/get_users', (req, res) => {
  res.send(users);
});

app.use((req, res) => {
  res.status(404).render('error');
});

app.listen(PORT, () => {
  console.log(`Serverul rulează pe portul ${PORT}`);
});
