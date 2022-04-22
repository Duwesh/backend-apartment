const express = require("express");
const cors = require("cors");
require("dotenv").config();

// creating express app
const app = express();

// importing controllers
const managerController = require("./controllers/manager.controller");
const flatController = require("./controllers/flat.controller");
const residentController = require("./controllers/resident.controller");

// Global Middleware for cors and json file
app.use(cors());
app.use(express.json());

// connecting with database
const connection = require("./configs/db");
// connection();

// port
const PORT = process.env.PORT || 5000;

// different routes
app.use("/manager", managerController);
app.use("/flats", flatController);
app.use("/residents", residentController);

// listening to port 3007
app.listen(PORT, async (req, res) => {
  try {
    await connection();
    console.log(`Server Running On Port ${PORT}`);
  } catch (er) {
    console.log(er.message);
  }
});

// console.log(`Listening on port ${PORT}`)
