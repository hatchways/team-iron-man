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

function CreatingMatch() {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const screenshot = "https://res.cloudinary.com/du081ilw3/image/upload/v1620196997/Screenshots/create_game_rvcbco.png"

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <Typography className={classes.header}>
                Creating A Match
            </Typography>
            <Typography className={classes.description}>
                Once the host is decided and clicks the "New Game" button on the home page,
                they will be sent to a match creation page. There they can send out email
                invitations to players, or they can copy the game's URL to send to their friends.
            </Typography>
            <div className={classes.center}>
                <img src={screenshot} className={classes.screenshot} onClick={() => setOpen(true)} />
                <figcaption className={classes.description}>Click to enlarge.</figcaption>
            </div>
            <Typography className={classes.description}>
                The host can then click on the "Create Match" to confirm they want to start a new game.
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

export default CreatingMatch;