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

        socket.on('join-match', ({ matchId }) => {
            io.emit('join-game-engine', game[matchId].toJson());
        })

        socket.on('create-game-engine', ({ user, matchId }) => {
            game[matchId] = new gameEngine(user, matchId);
            io.emit('start-game-engine', game[matchId].toJson());
        });

        socket.on('assign-role', ({ player, role, matchId }) => {
            game[matchId].assignRole(player, role);
            io.emit('update-game-engine-' + matchId, game[matchId].toJson());
        })

        socket.on('remove-role', ({ player, role, matchId }) => {
            game[matchId].removeRole(player, role);
            io.emit('update-game-engine-' + matchId, game[matchId].toJson());
        })

        socket.on('get-game-engine', ({ matchId }) => {
            io.emit('update-game-engine-' + matchId, game[matchId].toJson());
        })

        socket.on('set-match-in-progress', ({ matchId }) => {
            game[matchId].setInProgress();
            io.emit('update-game-engine-' + matchId, game[matchId].toJson());
        })

        socket.on('next-turn', ({ matchId }) => {
            game[matchId].nextTurn();
            io.emit('update-game-engine-' + matchId, game[matchId].toJson());
        })

        socket.on('set-clue', ({ matchId, clue }) => {
            game[matchId].setClue(clue);
            game[matchId].nextPhase();
            io.emit('update-game-engine-' + matchId, game[matchId].toJson());
        })

        socket.on('next-phase', ({ matchId }) => {
            game[matchId].nextPhase();
            io.emit('update-game-engine-' + matchId, game[matchId].toJson());
        })

        socket.on('check-card', ({ matchId, row, column }) => {
            game[matchId].checkCard(row, column);
            io.emit('update-game-engine-' + matchId, game[matchId].toJson());
        })
    });
}