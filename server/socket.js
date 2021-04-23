var socket = require("socket.io");
exports.socketConnect = function (server) {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });
    io.on("connection", socket => {
        socket.on("message", ({ name, message }) => {
            io.emit("message", { name, message });
            console.log(name + " has connected.");
        });
    });
}