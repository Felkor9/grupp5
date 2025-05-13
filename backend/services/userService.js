const connectionMySQL = require("./../connectionMySQL");
const UserModel = require('./../models/userModel')

function getUsers() {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM user";
    connectionMySQL.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function getUserLogin(username, password) {
  try {
    const user = await UserModel.findOne({ username: username });

    if (!user) {
      return null;
      // console.log(user)
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return null;
    }

    return user;
  } catch (err) {
    throw err;
  }
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

function createUser(userName, userEmail, userPassword) {
  return new Promise((resolve, reject) => {
    let sql = "INSERT INTO user (userName, userEmail, userPassword) VALUES (?,?,?)";
    let params = [userName, userEmail, userPassword];

    connectionMySQL.query(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function updateUser(userId, data) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE user SET userName = ?, userEmail = ?, userPassword = ? WHERE userId = ?";
    const values = [data.userName, data.userEmail, data.userPassword, userId];
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
  getUserLogin,
};
