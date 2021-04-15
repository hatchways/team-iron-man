/*
UI for creating a new game.
*/

import React from "react";
import GameInvitation from "../components/GameInvitation"
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        width: "50%",
        textAlign: "center",
        backgroundColor: "white",
        boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)",
        borderRadius: "10px",
        padding: "20px",
        paddingBottom: "50px",
    },

    hr: {
        width: "10%",
        border: "1px solid #00e676"
    },
})


function NewGame() {

    const classes = useStyles();

    // Implement creation of new game in the future.
    const createGame = () => {

    }

    return (
        <div className={classes.container}>
            <h1>New Game</h1>
            <hr className={classes.hr} />
            <GameInvitation />
            <br />
            <Button variant="contained" color="secondary" onClick={createGame}>Create Game</Button>
        </div>
    );
}

export default NewGame;