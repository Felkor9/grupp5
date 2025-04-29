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

function getResa(id) {
  return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM resor WHERE resorId = ?';
      connectionMySQL.query(sql, [id], (err, rows) => {
          if(err)
              reject(err);
          else
              resolve(rows);
      });
  });
}

function createResor(resorLand, resorDatum, resaLangd, resorPris){
  return new Promise((resolve, reject)=>{
      let sql= 'INSERT INTO resor (resorLand, resorDatum, resaLangd, resorPris) VALUES (?,?,?,?)'
      let params = [resorLand, resorDatum, resaLangd, resorPris]

      connectionMySQL.query(sql,params, (err)=>{
          if(err)
              reject(err)
          else
          resolve()
      })
  })
}

module.exports={
  getResor,
  getResa,
  createResor
}
