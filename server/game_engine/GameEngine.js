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

class Game {

    constructor(blueTeam, redTeam) {
        this.blueTeam = blueTeam;
        this.redTeam = redTeam;
        this.turn = "blue";
        this.bluePoints = 0;
        this.redPoints = 0;
        this.dictionary = {};
        this.numOfGuesses = 0;
    }

    checkCard() {
        // If card color and turn variable match, add a point to that team, otherwise add a point to other team.
        // If card color is black, other team wins and end the game.
    }

    nextTurn() {
        this.turn === "blue" ? this.turn = "red" : this.turn = " blue";
    }

    getTurn() {
        return this.turn;
    }

    getBluePoints() {
        return this.bluePoints;
    }

    getRedPoints() {
        return this.redPoints;
    }

    incrementBluePoints() {
        this.bluePoints++;
    }

    incrementRedPoints() {
        this.redPoints++;
    }

    setGuesses(guesses) {
        this.guesses = guesses;
    }

    restartGame() {
        this.shuffleWords();
        this.bluePoints = 0;
        this.redPoints = 0;
    }
}

export default Game;