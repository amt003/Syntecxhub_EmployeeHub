const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    err.statusCode = 400;
    err.message = message;
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    err.statusCode = 400;
    err.message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }

  // Cast error (invalid ID)
  if (err.name === "CastError") {
    err.statusCode = 400;
    err.message = "Invalid ID";
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

module.exports = errorHandler;
