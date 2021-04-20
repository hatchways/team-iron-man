/*
UI for creating a new game.
*/

import React from "react";
import GameInvitation from "../components/GameInvitation"
import { Button, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        width: "50%",
        textAlign: "center",
        backgroundColor: "white",
        boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)",
        borderRadius: "10px",
        padding: "50px",
        paddingBottom: "80px",
        marginLeft: "25%",
        marginTop: "9%"
    },

    header: {
        fontWeight: "600",
        fontSize: "48px",
    },

    hr: {
        width: "10%",
        border: "1px solid #00e676"
    },
    spacing: {
        marginTop: "20px",
    },
    background: {
        display: "flex",
        justifyContent: "center",
    }
})


function NewGame() {

    const classes = useStyles();

    // TODO: Implement creation of new game in the future.
    const createGame = () => {

    }

    return (
        <div className={classes.container}>
            <Typography color="textPrimary" className={classes.header}>
                New Game
                    </Typography>
            <hr className={classes.hr} />
            <GameInvitation />
            <Button variant="contained" color="secondary" onClick={createGame} className={classes.spacing}>Create Game</Button>
        </div>
    );
}

export default NewGame;