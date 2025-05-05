const mongoose = require("mongoose");

const connectionMongoDB = async () => {
  try {
    await mongoose.connect("");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectionMongoDB;
