const express = require("express");
const cors = require("cors");
require("dotenv").config();
// connecting with database
const connection = require("./configs/db");
// creating express app
const app = express();

// importing controllers
const managerController = require("./controllers/manager.controller");
const flatController = require("./controllers/flat.controller");
const residentController = require("./controllers/resident.controller");

// Global Middleware for cors and json file
app.use(cors());
app.use(express.json());

// connection();

// port
const port = process.env.PORT || 5000;

// different routes
app.use("/manager", managerController);
app.use("/flats", flatController);
app.use("/residents", residentController);

// listening to port 3007
app.listen(port, async (req, res) => {
  try {
    await connection();
    console.log(`Server Running On port ${port}`);
  } catch (er) {
    console.log(`error: ${er.message}`);
  }
});

// console.log(`Listening on port ${PORT}`)
// URL=mongodb+srv://Dk123:Dk123@cluster0.6cihs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority