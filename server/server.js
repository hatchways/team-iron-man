const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

io.on("connection", socket => {
    socket.emit("id", socket.id);
    socket.on("send message", body => {
        io.emit("message", body)
    })
})

server.listen(8000, () => {
  console.log("Server is listening on port 8000")
});