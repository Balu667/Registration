const mongoose = require("mongoose");

// const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const uploadImage = new Schema({
  image: { type: String, required: true }
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("uploadImage", uploadImage);