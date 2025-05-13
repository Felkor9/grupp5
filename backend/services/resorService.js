const connectionMySQL = require("./../connectionMySQL");

function getResor() {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM resor";
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getResa(id) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM resor WHERE resorId = ?";
    connectionMySQL.query(sql, [id], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// getResorDestination
function getResorDestination() {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT resor.resorLand, destination.destinationStad, destination.destinationHotell FROM resor INNER JOIN destination ON resor.resorId = destination.destinationResorId";
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// getResaDestination med specifikt ID
function getResaDestination(id) {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT resor.resorId, resor.resorLand, destination.destinationStad, destination.destinationHotell, destination.destinationStadBild_url, destination.destinationHotellBild_url FROM resor INNER JOIN destination ON resor.resorId = destination.destinationResorId WHERE resor.resorId = ?;";
    connectionMySQL.query(sql, [id], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function createResor(
  resorLand,
  resorDatum,
  resorLangd,
  resorPris,
  resorbild_url
) {
  return new Promise((resolve, reject) => {
    let sql =
      "INSERT INTO resor (resorLand, resorDatum, resorLangd, resorPris, resorbild_url) VALUES (?,?,?,?,?)";
    let params = [resorLand, resorDatum, resorLangd, resorPris, resorbild_url];

    connectionMySQL.query(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function updateResor(resorId, data) {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE resor SET resorLand = ?, resorDatum = ?, resorLangd = ?, resorPris = ? WHERE resorId = ?";
    const values = [
      data.resorLand,
      data.resorDatum,
      data.resorLangd,
      data.resorPris,
      resorId,
    ];
    connectionMySQL.query(sql, values, (err, result) => {
      if (err) reject(err);
      else resolve({ resorId, ...data });
    });
  });
}

function deleteResa(resorId) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM resor WHERE resorId = ?";
    connectionMySQL.query(sql, [resorId], (err, result) => {
      if (err) reject(err);
      else resolve({ message: "Resa borttagen", resorId });
    });
  });
}

module.exports = {
  getResor,
  getResa,
  createResor,
  updateResor,
  deleteResa,
  getResaDestination,
  getResorDestination,
};
