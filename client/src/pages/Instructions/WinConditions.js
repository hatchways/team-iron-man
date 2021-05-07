import React, { useState } from "react";
import { makeStyles, Typography, Modal } from "@material-ui/core";

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

function WinConditions() {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const screenshot = ""

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <Typography className={classes.header}>
                Win Conditions
            </Typography>
            <Typography className={classes.description}>
                There are two ways to win the game:
            </Typography>
            <Typography className={classes.description}>
                1.&#41; All of your team's cards are revealed; hitting the maximum point total.
            </Typography>
            <Typography className={classes.description}>
                2.&#41; The other team revealed a black card.
            </Typography>
            <Typography className={classes.description}>
                Once a team achieves victory, the game ends and all players are shown a game
                over prompt. From there they can create a new game or exit back to the home
                screen.
            </Typography>
            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
            >
                <img src={screenshot} alt={"Game Over Screen"} className={classes.enlarged} />
            </Modal>
        </React.Fragment>
    )
};

export default WinConditions;