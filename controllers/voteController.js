require('dotenv').config();

const voteController = {
  vote: (req, res) => {
    // {mylogin, theirlogin, vote}
    const { mylogin, theirlogin, vote } = req.body;
    const q = `INSERT INTO matches VALUES ('${mylogin}', '${theirlogin}', '${vote}')`;
    const checkMatch = new Promise((resolve, reject) => {
      client.query(q, (err, results) => {
        if (err) {
          console.log(err);
          reject();
        } else {
          console.log(results);
          resolve();
        }
      });
    }).then(() => {
      const s = `SELECT vote FROM matches WHERE (mylogin='${theirlogin}' AND theirlogin='${mylogin}')`;
      client.query(s, (err, results) => {
        console.log('results SELECT: ', results.rows[0]);
        if (err) {
          console.log(err);
        }
        if (results.rows[0] && results.rows[0].vote === true && req.body.vote === true) {
          res.send(true);
        }
        if (!results.rows[0]) {
          res.send('pending');
        }
        if (results.rows[0].vote === false || req.body.vote === false) {
          res.send(false);
        }
      });
    });
  },
};

module.exports = voteController;