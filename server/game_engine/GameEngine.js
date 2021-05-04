/*
Game engine class.
Two teams: red and blue team.
Initializes a game given two players. It initializes a Board with random words from a dictionary. It also assigns roles to the players (spymaster and guesser)
The dictionary could be something that’s hard coded
Game State (Board state, whose turn it is, points)
Methods for next move: given a player and a move, figure out the next state and return
- If a player makes a move (for example: guesses one word), determine the next state (for ex: dependant on a bunch of other rules)
Method for determining if match is over:
- If you click on a black card
- If you win the game (one team guesses all their words)
Method for restarting: all the words get reshuffled again, points reset to 0.
*/
const { bisectLeft } = require("../utility/util");
const wordList = require("./wordList");

class Game {
    constructor(hostId, matchId) {
        this.host = hostId;
        this.matchId = matchId;
        this.playersReady = [];
        this.blueGuessers = [];
        this.blueSpymaster = {};
        this.redGuessers = [];
        this.redSpymaster = {};
        this.turn = "blue";
        this.turnPhase = "clue"; // Have a seperate phase so players can't click on stuff while the spymaster comes up with a clue.
        this.clue = "";
        this.bluePoints = 0;
        this.redPoints = 0;
        this.guessesMade = 0;
        this.maxGuesses = 0;
        this.board = [];
        this.winner = "";
        this.turnCount = 1; // Turn and move counters could be useful to store.
        this.moveCount = 0;
        this.inProgress = false;
        this.shuffleBoard({ blues: 9, reds: 8, whites: 7, blacks: 1 });
    }

    checkCard(row, column) {
        // If card color and turn variable match, add a point to that team, then check
        // if the game is over based on points, if not then check if the max number
        // of guesses has been made.
        const card = this.board[row][column];
        card.revealed = true;
        this.moveCount++;
        this.incrementGuesses();
        if (card.color === this.turn) {
            this.turn === "blue" ? this.incrementBluePoints : this.incrementRedPoints;
            if (this.getBluePoints === 9 || this.getRedPoints === 8) {
                this.setWinner(this.turn);
                this.gameOver();
            }
            if (this.guessesMade === this.maxGuesses) {
                this.nextTurn();
            }
        }
        // If the card color is black, award the victory to the other team then end the game.
        else if (card.color === "black") {
            this.turn === "blue" ? this.setWinner("red") : this.setWinner("blue");
            this.gameOver();
        }
        // If the card color is white, move on to the next turn.
        else if (card.color === "white") {
            this.nextTurn();
        }
        // If the card color is the other team, increase the other team's points and end the game.
        else {
            this.turn === "blue" ? this.incrementRedPoints : this.incrementBluePoints;
            this.nextTurn();
        }
    }

    nextTurn() {
        this.turn === "blue" ? (this.turn = "red") : (this.turn = " blue");
        this.guessesMade = 0;
        this.turnPhase = "clue";
        this.turnCount++;
    }

    nextPhase() {
        this.turnPhase = "guess";
    }

    getBoard() {
        return this.board;
    }

    getTurn() {
        return this.turn;
    }

    getWinner() {
        return this.winner;
    }

    getBluePoints() {
        return this.bluePoints;
    }

    getRedPoints() {
        return this.redPoints;
    }

    getClue() {
        return this.clue;
    }

    setClue(clue) {
        this.clue = clue;
    }

    incrementBluePoints() {
        this.bluePoints++;
    }

    incrementRedPoints() {
        this.redPoints++;
    }

    incrementGuesses() {
        this.guessesMade++;
    }

    setMaxGuesses(maxGuesses) {
        this.maxGuesses = maxGuesses;
    }

    setWinner(team) {
        this.winner = team;
    }

    //Not sure if this will be useful, maybe to help with front end integration.
    gameOver() {
        //TODO: save match to database?
        this.turnPhase = "gameOver";
    }

    restartGame() {
        this.shuffleBoard();
        this.bluePoints = 0;
        this.redPoints = 0;
        this.turn = "blue";
        this.turnPhase = "clue";
        this.clue = "";
        this.guessesMade = 0;
    }

    shuffleBoard(colorCounts) {
        let words = wordList;
        const { blues, reds, whites, blacks } = colorCounts;
        let colors = [
            ...new Array(blues).fill("blue"),
            ...new Array(reds).fill("red"),
            ...new Array(whites).fill("white"),
            ...new Array(blacks).fill("black"),
        ];
        for (let i = 0; i < 5; i++) {
            this.board.push([]); //Push empty row
            for (let j = 0; j < 5; j++) {
                const randomWordIndex = Math.floor(Math.random() * words.length); //Pick random word
                const randomColorIndex = Math.floor(Math.random() * colors.length); //Pick random color
                let card = {
                    word: words[randomWordIndex],
                    color: colors[randomColorIndex],
                    revealed: false,
                };
                words.splice(randomWordIndex, 1); //Remove the word from the list so it can't be picked again.
                colors.splice(randomColorIndex, 1);
                this.board[i].push(card);
            }
        }
    }

    getRoles() {
        return {
            blueGuessers: this.blueGuessers,
            blueSpymaster: this.blueSpymaster,
            redGuessers: this.redGuessers,
            redSpymaster: this.redSpymaster,
        };
    }

    assignRole(player, role) {
        role.indexOf("Spymaster") === -1
            ? this[role].push(player)
            : (this[role] = player);
        this.playersReady.push(player);
    }

    removeRole(player, role) {
        role.indexOf("Spymaster") === -1
            ? (this[role] = this[role].filter((p) => p.name !== player.name))
            : (this[role] = {});
        this.playersReady = this.playersReady.filter((p) => p.name !== player.name);
    }

    setInProgress() {
        this.inProgress = true;
    }

    toJson() {
        return {
            host: this.host,
            matchId: this.matchId,
            blueGuessers: this.blueGuessers,
            blueSpymaster: this.blueSpymaster,
            redGuessers: this.redGuessers,
            redSpymaster: this.redSpymaster,
            turn: this.turn,
            turnPhase: this.turnPhase,
            clue: this.clue,
            bluePoints: this.bluePoints,
            redPoints: this.redPoints,
            guessesMade: this.guessesMade,
            maxGuesses: this.maxGuesses,
            board: this.board,
            winner: this.winner,
            turnCount: this.turnCount,
            moveCount: this.moveCount,
            playersReady: this.playersReady,
            inProgress: this.inProgress,
        };
    }
}

module.exports = Game;
