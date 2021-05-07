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
        textAlign: 'center'
    },
    screenshot: {
        width: '75%',
        border: '1px solid black',
        borderRadius: '10px',
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

function JoiningMatch() {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const screenshot = "https://res.cloudinary.com/du081ilw3/image/upload/v1620198287/Screenshots/join_game_snetm5.png"

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <Typography className={classes.header}>
                Joining A Match
            </Typography>
            <Typography className={classes.description}>
                The host will send out of invite links to the other players.
            </Typography>
            <Typography className={classes.description}>
                Players can join a match by either directly entering the link
                into their browser, or by clicking on the Join Game button
                at the home page.
            </Typography>
            <Typography className={classes.description}>
                If choosing the latter method, the user will be sent to a page
                asking to enter a match ID. This ID will be given by the host
                or other players already waiting in the lobby.
            </Typography>
            <div className={classes.center}>
                <img src={screenshot} className={classes.screenshot} alt={"Joining Match Page"} onClick={() => setOpen(true)} />
                <figcaption className={classes.description}>Click to enlarge.</figcaption>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
            >
                <img src={screenshot} alt={"Joining Match Page"} className={classes.enlarged} />
            </Modal>
        </React.Fragment>
    )
};

export default JoiningMatch;