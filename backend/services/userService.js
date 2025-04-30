const connectionMySQL = require("./../connectionMySQL");

function getUsers() {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM user";
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getUser(id) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM user WHERE userId = ?";
    connectionMySQL.query(sql, [id], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function createUser(userName, userEmail) {
  return new Promise((resolve, reject) => {
    let sql = "INSERT INTO user (userName, userEmail) VALUES (?,?)";
    let params = [userName, userEmail];

    connectionMySQL.query(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function updateUser(userId, data) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE user SET userName = ?, userEmail = ? WHERE userId = ?";
    const values = [data.userName, data.userEmail, userId];
    connectionMySQL.query(sql, values, (err, result) => {
      if (err) reject(err);
      else resolve({ resorId, ...data });
    });
  });
}

function deleteUser(userId) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM user WHERE userId = ?";
    connectionMySQL.query(sql, [userId], (err, result) => {
      if (err) reject(err);
      else resolve({ message: "Användare borttagen", userId });
    });
  });
}

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
