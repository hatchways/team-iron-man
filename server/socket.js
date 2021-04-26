const gameEngine = require('/game_engine/GameEngine');
let game = null;

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
            game = new gameEngine(user, matchId);
            io.emit('start-game-engine', game.toJson());
        });

        socket.on('assign-role', ({ user, role }) => {
            game.assignRole(user, role);
            io.emit('update-game-engine', game.toJson());
        })

        socket.on('remove-role', ({ user, role }) => {
            game.removeRole(user, role);
            io.emit('update-game-engine', game.toJson());
        })
    });
}