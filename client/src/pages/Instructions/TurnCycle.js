import React, { useState } from "react";
import { makeStyles, Typography, Modal } from "@material-ui/core";

const useStyles = makeStyles({
    description: {
        fontStyle: 'italic',
        marginBottom: '20px'
    },
    header: {
        fontSize: '24px',
        marginBottom: '20px'
    },
    subheader: {
        fontSize: '18px',
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

function TurnCycle() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const screenshot = "";

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <Typography className={classes.header}>
                Turn Cycle
            </Typography>
            <Typography className={classes.subheader}>
                Clue Phase
            </Typography>
            <Typography className={classes.description}>
                At the start of a turn, the spymaster will be given a prompt to enter the
                one-word clue and the maximum number of guesses. Once they click on the
                submit button the turn will move onto the next phase.
            </Typography>
            <Typography className={classes.subheader}>
                Guessing Phase
            </Typography>
            <Typography className={classes.description}>
                The guessers can then click on which card they think relates to the given clue.
                If a team has multiple guessers, each guesser votes for a card by clicking on one.
                Once all guessers for that team have selected a card, the card with the most votes
                will get revealed. TODO: Decide how ties are settled.
            </Typography>
            <Typography className={classes.description}>
                If the guessers are not confident they can pick a correct card, they can vote to
                "pass", moving on to the other team's turn.
            </Typography>
            <Typography className={classes.subheader}>
                Card Reveal
            </Typography>
            <Typography className={classes.description}>
                If the guessers select a card belonging to their team, that team gets a point.
                The turn will remain in the guessing phase.
                The guessers can then keep on attempting for more cards up to the maximum number
                of guesses allowed given by the spymaster.
            </Typography>
            <Typography className={classes.description}>
                If a card belonging to the other team is revealed, the other team gets a point and
                the turn ends.
            </Typography>
            <Typography className={classes.description}>
                If a white card is revealed, no point is awarded to either team but the turn still ends.
            </Typography>
            <Typography className={classes.description}>
                If a black card is revealed, the other team is awarded victory and the game ends.
            </Typography>
            <Typography className={classes.description}>
                If the game has not ended, once the number of guesses has reached the maximum, or the team
                voted to pass, the turn ends, and the next team's turn begins at the clue phase.
            </Typography>
            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
            >
                <img src={screenshot} className={classes.enlarged} />
            </Modal>
        </React.Fragment>
    )
};

export default TurnCycle;