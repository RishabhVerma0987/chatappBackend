const express = require("express");
const dotenv = require("dotenv");
const app = express();
const socket = require("socket.io");
const color = require("colors");
const cors = require("cors");
dotenv.config({ path: "../backend/config/config.env" });

const port = process.env.PORT || 5000;

app.use(cors());
var server = app.listen(
  port,
  console.log(
    `Server is running in ${process.env.NODE_ENV} on port ${process.env.PORT} `
      .yellow.bold
  )
);

// Socket setup & pass server
var io = socket(server);
io.on("connection", (socket) => {
  console.log("made socket connection".green.bold, socket.id);

  // Handle chat event
  socket.on("chat", function (data) {
    console.log(data);
    io.sockets.emit("chat", data);
  });
});
