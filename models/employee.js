const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  password_hash: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  }
});

module.exports = mongoose.model("employee", employeeSchema);
