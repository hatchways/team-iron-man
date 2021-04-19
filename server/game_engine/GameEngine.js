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

    constructor(blueGuessers, blueSpymaster, redGuessers, redSpymaster) {

        this.blueGuessers = blueGuessers;
        this.blueSpymaster = blueSpymaster
        this.redGuessers = redGuessers;
        this.redSpymaster = redSpymaster;
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
        this.shuffleBoard();
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
                this.setWinner(this.turn)
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
        this.turn === "blue" ? this.turn = "red" : this.turn = " blue";
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

    shuffleBoard() {
        var words = ["Cat", "Dog", "Bird", "Fox", "Monkey", "Snake", "Panda", "Dinosaur", "Dolphin", "Human", "Monster", "Slime",
            "Blueberry", "Strawberry", "Orange", "Mango", "Banana", "Apple", "Tomato", "Cucumber", "Cherry", "Avocado",
            "Car", "Airplane", "Bike", "Truck", "Tesla",
            "Sword", "Shield", "Staff", "Bow", "Helmet", "Dagger", "Gun", "Belt", "Armor",
            "Beach", "Jungle", "Desert", "Water", "Earth", "Wind", "Fire", "Grass", "Space", "Snow", "Moon", "Electricity",
            "Ball", "Tail", "Shoe", "Rainbow", "Pole", "Computer", "Cellphone", "Camera", "Bitcoin", "Money", "Book",
            "Television", "House", "Doll",
            "Run", "Change", "Teleport", "Slash", "Switch", "Eat", "Picture", "Dare", "Retire"];
        var colorsIndex = [9, 8, 7, 1]; //Counter for card colors to be distributed (9 blue, 8 red, 7 white, 1 black)
        var colors = ["blue", "red", "white", "black"]
        this.board = []; //Reset the board
        for (var i = 0; i < 5; i++) {
            this.board.push([]); //Push empty row
            for (var j = 0; j < 5; j++) {
                const randomWordIndex = Math.floor(Math.random() * words.length); //Pick random word
                const randomColorIndex = Math.floor(Math.random() * colors.length); //Pick random color
                var card = { word: words[randomWordIndex], color: colors[randomColorIndex], revealed: false }
                words.splice(randomWordIndex, 1); //Remove the word from the list so it can't be picked again.
                // If the limit for a specific color is reached, remove it from the list, otherwise decrement it.
                colorsIndex[randomColorIndex] === 1 ? (colors.splice(randomColorIndex, 1), colorsIndex.splice(randomColorIndex, 1)) : colorsIndex[randomColorIndex]--;
                this.board[i].push(card);
            }
        }
    }
}

export default Game;