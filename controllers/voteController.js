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
  },

  getMatches : (req, res) => {
    let matches = [];
    const { mylogin } = req.body;
    let s = `SELECT * FROM matches WHERE (mylogin='${mylogin}' OR theirlogin='${mylogin}')`;
    let response = []
    const selectMatches = new Promise((resolve, reject) => {
    client.query(s, (err, results) => {
      if(err) console.log(err);
      let trackIlike = [];
      let trackTheylike = [];
      for(let i = 0; i < results.rows.length; i++){
        if(results.rows[i].mylogin !== req.body.mylogin && results.rows[i].vote === true) trackTheylike.push(results.rows[i].mylogin.toString());
        if(results.rows[i].mylogin === req.body.mylogin && results.rows[i].vote === true) trackIlike.push(results.rows[i].theirlogin.toString()); 
      }
      for(let j = 0; j < trackIlike.length; j++){
        if(trackTheylike.includes(trackIlike[j])) response.push(trackIlike[j]);
      }
      resolve();
  });
}).then(() => {
  console.log("response : ", response)
  // for(let i = 0; i < response.length; i++){
  let u = `SELECT * FROM users;`
  console.log("u :", u);
  client.query(u, (err, results) => {
    if(err) console.log(err);
    for(let j = 0; j < results.rows.length; j++){
      if(response.includes(results.rows[j].login)) matches.push(results.rows[j]);
    }
    res.send(matches);
    console.log(matches);
  })
  
})
}
// .then(() => {
// console.log("matches :", matches);
// res.send(matches);
// })

}

module.exports = voteController