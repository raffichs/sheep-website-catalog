import mongoose from "mongoose";


const sheepSchema = new mongoose.Schema({
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
});

const SheepModel = mongoose.model('Sheep', sheepSchema);

module.exports = SheepModel;