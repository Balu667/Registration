const mongoose = require("mongoose");

// const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { required: true, type: String },
  userName: { required: true, type: String , unique:true},
  password: { required: true, minlength: 6, type: String },
  image:{type:String}
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);