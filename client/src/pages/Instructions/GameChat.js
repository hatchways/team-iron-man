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

function GameChat() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const screenshot = "";

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <Typography className={classes.header}>
                Game Chat
            </Typography>
            <Typography className={classes.description}>
                To be implemented.
            </Typography>
            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
            >
                <img src={screenshot} alt={"chat"} className={classes.enlarged} />
            </Modal>
        </React.Fragment>
    )
};

export default GameChat;