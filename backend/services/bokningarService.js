const connectionMySQL = require("./../connectionMySQL");

//Funktion att hämta specifik användares bokningar
function getFullBookingByUser(bokningUserId) {
  return new Promise((resolve, reject) => {
    let sql = `
      SELECT
        b.bokningId,
        b.bokningAntalPlatser,
        d.destinationHotell,
        d.destinationStad,
        r.resorLand,
        r.resorDatum,
        d.destinationHotellBild_url
      FROM bokningar b
      INNER JOIN destination d ON b.bokningDestinationId = d.destinationId
      INNER JOIN resor r ON d.destinationResorId = r.resorId
      WHERE b.bokningUserId = ?;
    `;
    connectionMySQL.query(sql, [bokningUserId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

//Visar alla bokningar
function getBokningar() {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM bokningar";
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

//Visar specifik användares bokningar
function getBokning(id) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM bokningar WHERE bokningUserId = ?";
    connectionMySQL.query(sql, [id], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

//Visar bara en bokning
function getBokningKlar(id) {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT bokningar.bokningId, bokningar.bokningAntalPlatser, user.userName, resor.resorLand, resor.resorDatum, destination.destinationStad FROM bokningar INNER JOIN destination ON bokningar.bokningDestinationId = destination.destinationId INNER JOIN resor ON destination.destinationResorId = resor.resorId INNER JOIN user ON bokningar.bokningUserId = user.userId WHERE userId = ?";
    connectionMySQL.query(sql, [id], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

//Visar upp ALLA bokningar
function getAllaBokningar() {
  return new Promise((resolve, reject) => {
    let sql = `
      SELECT
        bokningar.bokningId,
        bokningar.bokningAntalPlatser,
        user.userName,
        resor.resorLand,
        resor.resorDatum,
        destination.destinationStad
      FROM bokningar
      INNER JOIN destination ON bokningar.bokningDestinationId = destination.destinationId
      INNER JOIN resor ON destination.destinationResorId = resor.resorId
      INNER JOIN user ON bokningar.bokningUserId = user.userId`;

    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

//Skapar en ny bokning
function createBokning(
  bokningAntalPlatser,
  bokningUserId,
  bokningDestinationId
) {
  return new Promise((resolve, reject) => {
    let sql =
      "INSERT INTO bokningar (bokningAntalPlatser, bokningUserId, bokningDestinationId) VALUES (?, ?, ?)";
    let params = [bokningAntalPlatser, bokningUserId, bokningDestinationId];

    connectionMySQL.query(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

//Uppdaterar antal platser i bokningen
function updateBokning(bokningId, data) {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE bokningar SET bokningAntalPlatser = ? WHERE bokningId = ?";
    const values = [data.bokningAntalPlatser, bokningId];
    connectionMySQL.query(sql, values, (err, result) => {
      if (err) reject(err);
      else resolve({ bokningId, ...data });
    });
  });
}

//Raderar en bokning
function deleteBokning(bokningId) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM bokningar WHERE bokningId = ?";
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
  getBokningKlar,
  getFullBookingByUser,
  getAllaBokningar,
};
