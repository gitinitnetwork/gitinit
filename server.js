//Router dependencies
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

//Postgresql stuff
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://grgrkypm:Wj-hDJsZaHn-pUoCSW_ON_z3JED4ZnPB@baasu.db.elephantsql.com:5432/grgrkypm';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Login (may not be needed with OAuth?)
app.use('/login/oauth', );

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
