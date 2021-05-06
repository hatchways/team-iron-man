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

function Overview() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography className={classes.header}>
                Overview
            </Typography>
            <Typography className={classes.description}>
                Cluewords is a board game desgined for a minimum of four players.
            </Typography>
            <Typography className={classes.description}>
                Players are split into two teams: blue and red, each with minimum two
                players. One player from each team is selected as the spymaster, the rest
                are the guessers.
            </Typography>
            <Typography className={classes.description}>
                The spymaster gives one-word clues that point to other words on the game
                board.
            </Typography>
            <Typography className={classes.description}>
                The game board consists of 25 cards arranged in a 5 x 5 grid. Some cards
                belong to each team, while some cards neutral, and one card is a
                black card. Each card has a unique word on it. The spymasters see what
                true color of the card while the guessers can only see the word.
            </Typography>
            <Typography className={classes.description}>
                Teams take turns trying to locate all of the cards belonging to their team
                while trying to avoid cards belonging to the other team.
                The game ends when one team finds all of their cards granting them the victory,
                or one team finding the black card granting the other team victory.
            </Typography>
        </React.Fragment>
    )
};

export default Overview;
