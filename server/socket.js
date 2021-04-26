var socket = require("socket.io");
exports.socketConnect = function (server) {
    const io = socket(server);
    io.on("connection", socket => {
        socket.on("message", ({ name, message }) => {
            io.emit("message", { name, message });
            console.log(name + " has connected.");
        });
    });
}