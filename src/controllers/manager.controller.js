const express = require("express");
const { body, validationResult } = require("express-validator");
const req = require("express/lib/request");
const bcrypt = require("bcrypt");

const router = express.Router();

//importing Manager model
const Manager = require("../models/manager.model");

router.post(
  "/register",
  // Name Validation
  body("name")
    .notEmpty()
    .withMessage("Name Cannot be Empty!")
    .isString()
    .withMessage("Enter Correct Name")
    .isLength({ min: 4, max: 28 })
    .withMessage("name length be between 5 and 28 characters"),
  // Email Validation
  body("email")
    .notEmpty()
    .withMessage("Email Cannot be Empty!")
    .isEmail()
    .withMessage("Email is not valid")
    .custom(async function (value) {
      try {
        const managerData = await Manager.findOne({ email: req.body.email })
          .lean()
          .exec();
        if (managerData) {
          return false;
        }
        return true;
      } catch (error) {
        console.log(error);
      }
    })
    .withMessage("User is Already Registered with this Email!!"),
  // Validating Password
  body("password")
    .notEmpty()
    .withMessage("Password Cannot Be Empty!!")
    .isLength({ min: 5, max: 25 })
    .withMessage("Password Should be between 5 to 25"),

  async (req, res) => {
    try {
      // Checking User Credentials
      let error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).send(error.array());
      }

      await Manager.create(req.body);
      return res.status(200).send({ status: true });
    } catch (error) {
      console.log(error);
    }
  }
);

//Login User
router.post("/login", async (req, res) => {
  try {
    // checking if manager with passed email exists in db or not
    let manager = await Manager.findOne({ email: req.body.email })
      .lean()
      .exec();
    if (manager) {
      let pass_match = await bcrypt.compare(
        req.body.password,
        manager.password
      );
      // console.log(pass_match);
      if (pass_match) {
        return res.status(200).send({ status: true });
      }
      return res.status(400).send({ status: false });
    }
    return res.status(400).send({ status: false });
  } catch (error) {
    console.log(error);
  }
});

//Exporting router
module.exports = router;
