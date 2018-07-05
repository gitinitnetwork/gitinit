// Router dependencies
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const voteController = require('./controllers/voteController');

const cookieParser = require('cookie-parser')
// Postgresql stuff
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://grgrkypm:Wj-hDJsZaHn-pUoCSW_ON_z3JED4ZnPB@baasu.db.elephantsql.com:5432/grgrkypm';

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
  console.log('cookies yo', req.cookies)
  if (req.cookies.token) {
    console.log('doing stuff')
  }
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

app.get('/main.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/main.js'));
});

// OAuth Login
app.get('/login/oauth', 
  userController.getCodeAndPost, 
  userController.registerUser, 
  cookieController.setTokenCookie, 
  (req, res) => {
    console.log('rerouting home')
    res.redirect('/')
});

// Display profile
app.get('/profile', );

// Edit profile
app.put('/profile', );

// Swipe left
app.post('/swipe', voteController.vote);



// Display all matches
app.post('/matches', voteController.getMatches);
