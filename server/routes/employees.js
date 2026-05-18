const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Employee = require("../models/Employee");

// Validation middleware
const validateEmployee = [
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("role")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Role must be at least 2 characters"),
  body("salary")
    .isFloat({ min: 0 })
    .withMessage("Salary must be a positive number"),
  body("department").trim().notEmpty().withMessage("Department is required"),
  body("phone")
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/)
    .withMessage("Please provide a valid phone number"),
  body("address").trim().notEmpty().withMessage("Address is required"),
  body("status")
    .isIn(["Active", "Inactive", "On Leave"])
    .withMessage("Status must be Active, Inactive, or On Leave"),
];

// Check validation middleware
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation errors",
      errors: errors.array(),
    });
  }
  next();
};

// GET all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET single employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }
    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// CREATE new employee
router.post("/", validateEmployee, checkValidation, async (req, res) => {
  try {
    const { name, email, role, salary, department, phone, address, status } =
      req.body;

    // Check if email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const employee = new Employee({
      name,
      email,
      role,
      salary,
      department,
      phone,
      address,
      status: status || "Active",
    });

    await employee.save();

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE employee by ID
router.put("/:id", validateEmployee, checkValidation, async (req, res) => {
  try {
    const { name, email, role, salary, department, phone, address, status } =
      req.body;

    // Check if email is being changed and if new email already exists
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    if (email !== employee.email) {
      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        role,
        salary,
        department,
        phone,
        address,
        status,
      },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE employee by ID
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
