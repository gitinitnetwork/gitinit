const pg = require('pg');
const querystring = require('querystring');
const request = require('request');
require('dotenv').config();

const connectionString = 'postgres://grgrkypm:Wj-hDJsZaHn-pUoCSW_ON_z3JED4ZnPB@baasu.db.elephantsql.com:5432/grgrkypm';

const client = new pg.Client({ connectionString });

client.connect((err) => {
  if (err) {
    console.log('client connect error: ', err);
  } else {
    console.log('Connected to DB');
  }
});

const userController = {
  getAllUsers: (req, res, next) => {
    const getAll = 'SELECT * FROM users';
    client.query(getAll, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        console.log(results);
        res.send(results);
      }
    });
  },

  getCodeAndPost: (req, res, next) => {
    // Get code from req URL
    const githubCode = querystring.parse(req.url, '?').code;
    // Post code back to GitHub with promise
    const githubPost = new Promise((resolve, reject) => {
      request.post(`https://github.com/login/oauth/access_token?client_id=d337730ee82c0f67d053&client_secret=64771a508a69cbb40ea77c68e1ec19eab4428dcb&code=${githubCode}`, (err, response) => {
        if (err) {
          console.log('Could not post code to github');
          res.status(400).send(err);
          reject();
        } else {
          // Receive token from GitHub
          resolve(response.body);
        }
      });
    }).then((tokenstring) => {
      res.locals.token = querystring.parse(tokenstring).access_token;
      console.log('res.locals.token', res.locals.token);
      next();
    });
  },

  registerUser: (req, res, next) => {
    if (res.locals.token) {
      const getUserData = new Promise((resolve, reject) => {
        request.get({
          headers: {
            'User-Agent': 'Git Init',
          },
          url: `https://api.github.com/user?access_token=${res.locals.token}`,
        }, (err, response) => {
          if (err) {
            console.log('Could not get user data github');
            reject();
          } else {
            resolve(JSON.parse(response.body));
          }
        });
      }).then((userInfo) => {
        console.log('userInfo:', userInfo);
        const { login, followers, avatar_url } = userInfo;
        const findUser = `SELECT * FROM users WHERE login = '${login}'`;
        client.query(findUser, (err, results) => {
          if (err) {
            const newUser = `INSERT INTO users VALUES ('${login}', '${followers}', '${avatar_url}')`;
            client.query(newUser, (err, results) => {
              if (err) {
                console.log('error:', err);
                res.status(404).send('Insert user error: ' + err);
              } else {
                next();
              }
            });
          } else {
            console.log('moving on');
            next();
          }
        });
      });
    }
  },
};

module.exports = userController;
