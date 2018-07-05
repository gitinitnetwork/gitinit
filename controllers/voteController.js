const pg = require('pg');
const querystring = require('querystring');
const request = require('request');
require('dotenv').config();

const connectionString = 'postgres://grgrkypm:Wj-hDJsZaHn-pUoCSW_ON_z3JED4ZnPB@baasu.db.elephantsql.com:5432/grgrkypm'

const client = new pg.Client({ connectionString })

client.connect(function (err) {
  if (err) {
    res.status(400).send(err);
  } else {
    console.log('connected to pg...')
  }
});

const voteController = {
    vote: (req, res) => {
        // {mylogin, theirlogin, vote}
        const { mylogin, theirlogin, vote } = req.body;
        const q = `INSERT INTO matches VALUES ('${mylogin}', '${theirlogin}', '${vote}')`;
        const checkMatch = new Promise((resolve, reject) => {
          client.query(q, (err, results) => {
          if (err) {
            res.status(400).send(err);
          } else {
            resolve();
          }
        });
    }).then(() => {
      let s = `SELECT vote FROM matches WHERE (mylogin='${theirlogin}' AND theirlogin='${mylogin}')`;
      client.query(s, (err, results) => {
        console.log("results SELECT: ", results.rows[0]);
        if (err) {
          res.status(400).send(err);
        } else if (results.rows[0] && results.rows[0].vote === true && req.body.vote === true) {
          res.send(true);
        } else if (!results.rows[0]){
          res.send("pending");
        } else if (results.rows[0].vote === false || req.body.vote === false){
          res.send(false);
        }
        ;
      })
    })  
  }
}

module.exports = voteController;