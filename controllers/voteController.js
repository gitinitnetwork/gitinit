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

const voteController = {

    vote : (req, res) => {
        // {mylogin, theirlogin, vote}
        const { mylogin, theirlogin, vote } = req.body;
        const q = `INSERT INTO matches VALUES ('${mylogin}', '${theirlogin}', '${vote}')`;

        const checkMatch = new Promise((resolve, reject) => {
          client.query(q, (err, results) => {
          if (err) {
            console.log(err);
          }
          else {
            console.log(results);
            resolve();
          }
        });
    }).then(() => {
      let s = `SELECT vote FROM matches WHERE (mylogin='${theirlogin}' AND theirlogin='${mylogin}')`;
      client.query(s, (err, results) => {
        console.log("results SELECT: ", results.rows[0]);
        let response;
        if (err){
          console.log(err);
        }
        if (results.rows[0] && results.rows[0].vote === true && req.body.vote === true){
          res.send(true);
        }
        if (!results.rows[0]){
          res.send("pending");
        }
        if (results.rows[0].vote === false || req.body.vote === false){
          res.send(false);
        }
        ;
      })

    })
  },

  getMatches : (req, res) => {
    const { mylogin } = req.body;
    let s = `SELECT * FROM matches WHERE (mylogin='${mylogin}' OR theirlogin='${mylogin}')`;
    client.query(s, (err, results) => {
      if(err) console.log(err);
      console.log("results : ", results);
      for(let i = 0; results.rows)
      res.send(results)
  });
}
}

module.exports = voteController