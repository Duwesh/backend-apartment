const express = require("express");

// router
const router = express.Router();

// importing model
const Flat = require("../models/flat.model");

//Creating new Flat
router.post("/", async (req, res) => {
  try {
    let flat = await Flat.create(req.body);
    res.status(200).send(flat);
  } catch (error) {
    console.log(error);
  }
});

//Updating the flat with flat id
router.patch("/:id", async (req, res) => {
  try {
    await Flat.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send("updated successfully!");
  } catch (error) {
    console.log(error);
  }
});

//Fetching all flat data
router.get("/", async (req, res) => {
  try {
    let flatData = await Flat.find().lean().exec();
    res.status(200).send(flatData);
  } catch (error) {
    console.log(error);
  }
});

//For pagination
router.get("/:page_no", async (req, res) => {
  try {
    let skip = +req.params.page_count;
    skip = (skip - 1) * 10;
    let flats = await Flat.find().skip(skip).limit(10).lean().exec();
    return res.status(200).send(flats);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
