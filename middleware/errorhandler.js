const ErrorHandler = require("../utils/errorHandler.js");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message; //this statement is imp

  if (err.name == "CastError") {
    error = new ErrorHandler(`Not found at id ${err.value}`, 400);
  }

  if (err.code == 11000) {
    error = new ErrorHandler(`Duplicate Fields`, 400);
  }

  if (err.name == "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorHandler(`${message}`, 400);
  }

  console.log(err.message);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
