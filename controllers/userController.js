const pg = require('pg');
require('dotenv').config();
const bodyParser = require('body-parser');

const connectionString = 'postgres://grgrkypm:Wj-hDJsZaHn-pUoCSW_ON_z3JED4ZnPB@baasu.db.elephantsql.com:5432/grgrkypm'

const client = new pg.Client({ connectionString })

client.connect(function (err) {
    if (err) {
      console.log("client connect: ", err);
    } else {
      console.log('hi');
    }
  })


  const userController = {

    registerUser: (req, res, next) => {
      console.log("req.body : ", req.body);
        let { username, date, bio, picture } = req.body;
        let q = `INSERT INTO users VALUES ('${username}', '${date}', '${bio}', '${picture}')`
        client.query(q, (err, results) => {
            if (err) {
                console.log('error:', err);
                res.end();
              } else {
                res.send(results);
              }
    })
  }




  }

  module.exports = userController;