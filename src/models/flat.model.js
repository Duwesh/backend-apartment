const mongoose = require("mongoose");

const flatSchema = new mongoose.Schema(
  {
    flat_type: { type: String, required: true },
    block_name: { type: String, required: true },
    flat_no: { type: String, required: true },
    total_resident: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Flat", flatSchema);
