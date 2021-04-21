/*
UI for Game Board
*/

import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from "../components/Card";

const useStyles = makeStyles({
    root: {
        marginTop: '20px',
        marginLeft: '20%',
        width: '60%',
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto auto'
    }
});

export default function GameBoard() {


    const classes = useStyles();
    // This is copied from the game engine for testing purposes, when the integration is done this will come from the backend
    let words = ["Cat", "Dog", "Bird", "Fox", "Monkey", "Snake", "Panda", "Dinosaur", "Dolphin", "Human", "Monster", "Slime",
        "Blueberry", "Strawberry", "Orange", "Mango", "Banana", "Apple", "Tomato", "Cucumber", "Cherry", "Avocado",
        "Car", "Airplane", "Bike", "Truck", "Tesla",
        "Sword", "Shield", "Staff", "Bow", "Helmet", "Dagger", "Gun", "Belt", "Armor",
        "Beach", "Jungle", "Desert", "Water", "Earth", "Wind", "Fire", "Grass", "Space", "Snow", "Moon", "Electricity",
        "Ball", "Tail", "Shoe", "Rainbow", "Pole", "Computer", "Cellphone", "Camera", "Bitcoin", "Money", "Book",
        "Television", "House", "Doll",
        "Run", "Change", "Teleport", "Slash", "Switch", "Eat", "Picture", "Dare", "Retire"];
    let colors = ["blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue",
        "red", "red", "red", "red", "red", "red", "red", "red",
        "white", "white", "white", "white", "white", "white", "white",
        "black"];
    let board = []; //Reset the board
    for (let i = 0; i < 5; i++) {
        board.push([]); //Push empty row
        for (let j = 0; j < 5; j++) {
            const randomWordIndex = Math.floor(Math.random() * words.length); //Pick random word
            const randomColorIndex = Math.floor(Math.random() * colors.length); //Pick random color
            let card = { word: words[randomWordIndex], color: colors[randomColorIndex], revealed: false };
            words.splice(randomWordIndex, 1);
            colors.splice(randomColorIndex, 1);
            board[i].push(card);
        }
    }

    function onCardClick() {
        // TODO: integrate with backend.
    }

    return (
        <React.Fragment>
            <div className={classes.root}>
                {board.map((function (row) {
                    return row.map(
                        card => (
                            // Spymaster view coded in as a prop for now, will change during integration.
                            <Card key={card.word} word={card.word} color={card.color} spyMaster={false} revealed={card.revealed} />
                        ))
                }))}
            </div>
        </React.Fragment>
    );
}