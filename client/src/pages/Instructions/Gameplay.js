import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    description: {
        fontStyle: 'italic',
        marginBottom: '20px',
        fontFamily: 'Roboto'
    },
    header: {
        fontSize: '24px',
        marginBottom: '20px'
    },
    center: {
        width: '100%',
        textAlign: 'center',
        '&:hover': {
            curser: 'pointer'
        }
    },
    screenshot: {
        width: '75%',
        border: '1px solid black',
        borderRadius: '10px',
        "&:hover": {
            curser: 'pointer'
        }
    },
    figure: {
        width: '75%',
    },
    modal: {
        width: "80%",
        height: "50%",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        borderRadius: "10px",
    },
    enlarged: {
        width: '100%'
    }
})

function Gameplay() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography className={classes.header}>
                Gameplay
            </Typography>
            <Typography className={classes.description}>
                The objective of the game is locate and reveal all of your team's cards,
                while avoiding the all other cards.
            </Typography>
            <Typography className={classes.description}>
                Teams' spymasters will give a one-word clue to their guessers at the start
                of each turn.
            </Typography>
            <Typography className={classes.description}>
                In addition to the clue, the spymaster will give a maximum amount of guesses
                the guessers can make. The guessers then try to guess which card or cards
                relate to the given clue.
            </Typography>
            <Typography className={classes.description}>
                The next page will go into more detail of how each turn works.
            </Typography>
        </React.Fragment>
    )
};

export default Gameplay;