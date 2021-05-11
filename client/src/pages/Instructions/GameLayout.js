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

function GameLayout() {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const screenshot = ""

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <Typography className={classes.header}>
                Game Layout
            </Typography>
            <Typography className={classes.description}>
                Once the match has started players will be sent to the game screen.
            </Typography>
            <Typography className={classes.description}>
                On the left side is the in-game chat, where players can discuss their moves,
                have friendly banter, or talk about whatever.
            </Typography>
            <Typography className={classes.description}>
                On the right, taking up most of the screen, is the actual game board. Depending
                on the player's role (spymaster or guesser), the view will be different.
            </Typography>
            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
            >
                <img src={screenshot} alt={"Game Layout"} className={classes.enlarged} />
            </Modal>
        </React.Fragment>
    )
};

export default GameLayout;