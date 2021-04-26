const gameEngine = require('./game_engine/GameEngine');
let game = {};

var socket = require("socket.io");
exports.socketConnect = function (server) {
    const io = socket(server);
    io.on("connection", socket => {
        socket.on("message", ({ name, message }) => {
            io.emit("message", { name, message });
            console.log(name + " has connected.");
        });

        socket.on('join-match', ({ }) => {
            io.emit('join-game-engine', game.toJson());
        })

        socket.on('create-game-engine', ({ user, matchId }) => {
            game[matchId] = new gameEngine(user, matchId);
            io.emit('start-game-engine', game[matchId].toJson());
        });

        socket.on('assign-role', ({ user, role, matchId }) => {
            game[matchId].assignRole(user, role);
            io.emit('update-game-engine', game[matchId].toJson());
        })

        socket.on('remove-role', ({ user, role, matchId }) => {
            game[matchId].removeRole(user, role);
            io.emit('update-game-engine', game[matchId].toJson());
        })
    });
}