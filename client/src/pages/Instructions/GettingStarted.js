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
    }
})

function GettingStarted() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography className={classes.header}>
                Getting Started
            </Typography>
            <Typography className={classes.description}>
                On the home page there are two options to get started: New Game or Join Game.
            </Typography>
            <Typography className={classes.description}>
                If you have a group of people you want to play with, only one person needs to
                create a new game.
            </Typography>
            <Typography className={classes.description}>
                The other users will join the game using the Join Game button.
            </Typography>
        </React.Fragment>
    )
};

export default GettingStarted;
