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

        socket.on('join-match', ({ matchId, player }) => {
            game[matchId].addToInviteList(player);
            io.emit('join-game-engine', game[matchId].toJson());
        })

        socket.on('create-game-engine', ({ player, matchId }) => {
            game[matchId] = new gameEngine(player, matchId);
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
            if (game.hasOwnProperty(matchId)) {
                io.emit('update-game-engine-' + matchId, game[matchId].toJson());
            }
            else {
                io.emit('update-game-engine-' + matchId, { notFound: true });
            }
        })

        socket.on('set-match-in-progress', ({ matchId }) => {
            game[matchId].setInProgress();
            io.emit('update-game-engine-' + matchId, game[matchId].toJson());
        })

        socket.on('next-turn', ({ matchId }) => {
            game[matchId].nextTurn();
            io.emit('update-game-engine-' + matchId, game[matchId].toJson());
        })

        socket.on('set-clue', ({ matchId, clue, numOfGuesses }) => {
            game[matchId].setClue(clue);
            game[matchId].setMaxGuesses(numOfGuesses);
            game[matchId].nextPhase();
            io.emit('update-game-engine-' + matchId, game[matchId].toJson());
        })

        socket.on('next-phase', ({ matchId }) => {
            game[matchId].nextPhase();
            io.emit('update-game-engine-' + matchId, game[matchId].toJson());
        })

        socket.on('set-vote', ({ matchId, word, row, column, email }) => {
            game[matchId].addVote(word, row, column, email);;
            if (game[matchId].everyoneVoted) {
                const winningVote = game[matchId].countVotes();
                game[matchId].checkCard(winningVote.row, winningVote.column);
            }
            io.emit('update-game-engine-' + matchId, game[matchId].toJson());
        })

        socket.on('check-card', ({ matchId, row, column }) => {
            game[matchId].checkCard(row, column);
            io.emit('update-game-engine-' + matchId, game[matchId].toJson());
        })
    });
}