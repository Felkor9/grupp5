const connectionMySQL = require('./../connectionMySQL');

function getResor() {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM resor';
        connectionMySQL.query(sql, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

module.exports={
  getResor
}
