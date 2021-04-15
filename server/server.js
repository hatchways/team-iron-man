const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

io.on("connection", socket => {
    socket.on("message", ({message}) => {
        io.emit("message", {message})
    });
  });

server.listen(8000, () => {
    console.log("Server is listening on port 8000");
});