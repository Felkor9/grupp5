const connectionMySQL = require('./../connectionMySQL');

function getDestinations() {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM destination';
        connectionMySQL.query(sql, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

function getDestination(id) {
  return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM destination WHERE destinationId = ?';
      connectionMySQL.query(sql, [id], (err, rows) => {
          if(err)
              reject(err);
          else
              resolve(rows);
      });
  });
}

function createDestination(destinationStad, destinationHotell){
  return new Promise((resolve, reject)=>{
      let sql= 'INSERT INTO destination (destinationStad, destinationHotell) VALUES (?,?)'
      let params = [destinationStad, destinationHotell]

      connectionMySQL.query(sql,params, (err)=>{
          if(err)
              reject(err)
          else
          resolve()
      })
  })
};


function updateDestination(destinationId, data) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE destination SET destinationStad = ?, destinationHotell = ? WHERE destinationId = ?';
        const values = [data.destinationStad, data.destinationHotell, destinationId];
        connectionMySQL.query(sql, values, (err, result) => {
            if (err) reject(err);
            else resolve({ destinationId, ...data });
        });
    });
};

function deleteDestination(destinationId) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM destination WHERE destinationId = ?';
        connectionMySQL.query(sql, [destinationId], (err, result) => {
            if (err) reject(err);
            else resolve({ message: 'Destination borttagen', destinationId });
        });
    });
}

module.exports={
    getDestinations,
    getDestination,
    createDestination,
    updateDestination,
    deleteDestination,
}
