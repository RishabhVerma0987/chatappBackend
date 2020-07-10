const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(`Database Connected to ${conn.connection.host}`.cyan.bold);
};

module.exports = connectDB;
