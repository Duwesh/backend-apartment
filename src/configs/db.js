const mongoose = require("mongoose");
require("dotenv").config();

// async function connection() {
//   try {
//     const connection = await mongoose.connect(process.env.URL);
//     console.log("connection Established!");
//   } catch (err) {
//     console.log(err);
//   }
// }


 const connection = () => {
  return mongoose.connect(process.env.URL);
}

module.exports = connection;
