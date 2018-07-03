//Router dependencies
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController')

//Postgresql stuff
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://grgrkypm:Wj-hDJsZaHn-pUoCSW_ON_z3JED4ZnPB@baasu.db.elephantsql.com:5432/grgrkypm';

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

const PORT = 8080;

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

app.use(express.static(path.join(__dirname, 'build')));


app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

//Login (may not be needed with OAuth?)
app.post('/login/oauth', userController.registerUser);

// Display profile
app.get('/profile', );

// Edit profile
app.put('/profile', );


// Get to swipe screen
app.get('/swipe', );


// Swipe left
app.post('/swipe/:stash',);

// Swipe right
app.post('/swipe/:commit', );


// Display all matches
app.get('/matches');
