// Router dependencies
const express = require('express');
const pg = require('pg');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const voteController = require('./controllers/voteController');

const app = express();
// PG Connection
const connectionString = 'postgres://grgrkypm:Wj-hDJsZaHn-pUoCSW_ON_z3JED4ZnPB@baasu.db.elephantsql.com:5432/grgrkypm'
const client = new pg.Client({ connectionString })
client.connect((err) => {
  if (err) {
    console.log('client connect error: ', err);
  } else {
    console.log('Connected to DB');
  }
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

// app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  console.log('cookies yo', req.cookies);
  if (req.cookies.token) {
    console.log('Found token cookie');
  }
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

app.get('/main.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/main.js'));
});

app.get('/getAllUsers', userController.getAllUsers);

// OAuth Login
app.get('/login/oauth', userController.getCodeAndPost, userController.registerUser, cookieController.setTokenCookie, (req, res) => {
  console.log('rerouting home');
  res.redirect('/');
});

// Display profile
app.get('/profile', );

// Edit profile
app.put('/profile', );


// Get to swipe screen
app.get('/vote', );

// Swipe left
app.post('/swipe', voteController.vote);

// Swipe right
app.post('/swipe/:commit', );

// Display all matches
app.get('/matches');
