const mongoose = require("mongoose");

async function connection() {
  try {
    await mongoose.connect(process.env.URL);
    console.log("connection Established!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connection;
