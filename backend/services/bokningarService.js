const connectionMySQL = require("./../connectionMySQL");

function getBokningar() {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM resor";
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getBokning(id) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM bokningar WHERE bokningarId = ?";
    connectionMySQL.query(sql, [id], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getBokningKlar(id) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT bokningar.bokningAntalPlatser, user.userName, resor.resorLand, destination.destinationStad FROM bokningar INNER JOIN resor ON bokningar.bokningResorId = resor.resorId INNER JOIN user ON bokningar.bokningUserId = user.userId INNER JOIN destination ON resor.resorId = destination.destinationResorId WHERE userId = ?;";
    connectionMySQL.query(sql, [id], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function createBokning(bokningAntalPlatser) {
  return new Promise((resolve, reject) => {
    let sql = "INSERT INTO bokningar (bokningarAntalPlatser) VALUES (?)";
    let params = [bokningAntalPlatser];

    connectionMySQL.query(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function updateBokning(bokningId, data) {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE resor SET bokningAntalPlats";
    const values = [
      data.bokningAntalPlatser,
      bokningId,
    ];
    connectionMySQL.query(sql, values, (err, result) => {
      if (err) reject(err);
      else resolve({ bokningId, ...data });
    });
  });
}

function deleteBokning(bokningId) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM bokning WHERE bokningId = ?";
    connectionMySQL.query(sql, [bokningId], (err, result) => {
      if (err) reject(err);
      else resolve({ message: "Bokning borttagen", bokningId });
    });
  });
}

module.exports = {
  getBokningar,
  getBokning,
  createBokning,
  updateBokning,
  deleteBokning,
  getBokningKlar
};
