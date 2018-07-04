const pg = require('pg');
const querystring = require('querystring');
const request = require('request');
require('dotenv').config();

const connectionString = 'postgres://grgrkypm:Wj-hDJsZaHn-pUoCSW_ON_z3JED4ZnPB@baasu.db.elephantsql.com:5432/grgrkypm'

const client = new pg.Client({ connectionString })

client.connect(function (err) {
  if (err) {
    console.log("client connect: ", err);
  } else {
    console.log('hi');
  }
});

const userController = {
  getCodeAndPost: (req, res, next) => {
    // Get code from req URL
    let githubCode = querystring.parse(req.url, '?').code;
    // Post code back to GitHub with promise
    const githubPost = new Promise((resolve, reject) => {
      request.post(`https://github.com/login/oauth/access_token?client_id=d337730ee82c0f67d053&client_secret=64771a508a69cbb40ea77c68e1ec19eab4428dcb&code=${githubCode}`, (err, response) => {
        if (err) console.log('Could not post code to github');
        else {
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
        const q = `INSERT INTO users VALUES ('${login}', '${followers}', '${avatar_url}')`;
        client.query(q, (err, results) => {
          if (err) {
            console.log('error:', err);
            res.end();
          } else {
            next();
          }
        });
      });
    }
  }
}

module.exports = userController;