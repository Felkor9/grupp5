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

function createResor(resorLand, resorDatum, resorLangd, resorPris){
  return new Promise((resolve, reject)=>{
      let sql= 'INSERT INTO resor (resorLand, resorDatum, resorLangd, resorPris) VALUES (?,?,?,?)'
      let params = [resorLand, resorDatum, resorLangd, resorPris]

      connectionMySQL.query(sql,params, (err)=>{
          if(err)
              reject(err)
          else
          resolve()
      })
  })
};


function updateResor(resorId, data) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE resor SET resorLand = ?, resorDatum = ?, resaLangd = ?, resorPris = ? WHERE resorId = ?';
        const values = [data.resorLand, data.resorDatum, data.resaLangd, data.resorPris, resorId];
        connectionMySQL.query(sql, values, (err, result) => {
            if (err) reject(err);
            else resolve({ resorId, ...data });
        });
    });
};

function deleteResa(resorId) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM resor WHERE resorId = ?';
        connectionMySQL.query(sql, [resorId], (err, result) => {
            if (err) reject(err);
            else resolve({ message: 'Resa borttagen', resorId });
        });
    });
}

module.exports={
    getResor,
    getResa,
    createResor,
    updateResor,
    deleteResa,
}
