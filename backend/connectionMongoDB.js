const mongoose = require("mongoose");

const conectionMongoDB = async () => {
  try {
    await mongoose.connect("");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectionMongaDB;
