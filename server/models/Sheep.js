const mongoose = require("mongoose");
const { Schema } = mongoose;

const sheepSchema = new Schema(
  {
    name: String,
    price: Number,
    type: String,
    age: Number,
    height: Number,
    weight: Number,
    color: String,
    desc: String,
    category: String,
    status: String,
    photos: [String],
  },
  { timestamps: true }
);

const SheepModel = mongoose.model("Sheep", sheepSchema);

module.exports = SheepModel;
