const express = require("express");
const dotenv = require("dotenv");
const app = express();
const socket = require("socket.io");
const morgan = require("morgan");
const color = require("colors");
const cors = require("cors");
const connetDB = require("./config/db.js");
const errorHandler = require("./middleware/errorhandler.js");
dotenv.config({ path: "../backend/config/config.env" });

const auth = require("./routes/auth.js");

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/auth", auth);
app.use(errorHandler);
connetDB();

const port = process.env.PORT || 5000;

app.use(cors());
var server = app.listen(
  port,
  console.log(
    `Server is running in ${process.env.NODE_ENV} on port ${process.env.PORT} `
      .yellow.bold
  )
);
process.on("unhandledRejection", (err, promisee) => {
  console.log(`Error : ${err.message}`.red.bold);
  server.close(() => process.exit(1));
});
