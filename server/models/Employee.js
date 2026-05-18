const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    role: {
      type: String,
      required: [true, "Please provide a role"],
      trim: true,
      minlength: [2, "Role must be at least 2 characters"],
    },
    salary: {
      type: Number,
      required: [true, "Please provide a salary"],
      min: [0, "Salary cannot be negative"],
    },
    department: {
      type: String,
      required: [true, "Please provide a department"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
      match: [
        /^(\+\d{1,3}[- ]?)?\d{10}$/,
        "Please provide a valid phone number",
      ],
    },
    address: {
      type: String,
      required: [true, "Please provide an address"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "On Leave"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Employee", employeeSchema);
