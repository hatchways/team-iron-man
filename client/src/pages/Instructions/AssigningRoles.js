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

function AssigningRoles() {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const screenshot = "https://res.cloudinary.com/du081ilw3/image/upload/v1620199095/Screenshots/assign_roles_xt0xaz.png"

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <Typography className={classes.header}>
                Assigning Roles
            </Typography>
            <Typography className={classes.description}>
                Players will be sent to the lobby after joining (or creating if the host) the match
            </Typography>
            <Typography className={classes.description}>
                Players can choose their role and team by clicking on the "+" button next to the desired role.
                Their name will then be displayed underneath the role title.
            </Typography>
            <Typography className={classes.description}>
                Each team can have only one spymaster but multiple guessers. So choose your
                spymaster wisely.
            </Typography>
            <Typography className={classes.description}>
                Players can remove themselves from a role by clicking on the "-" button next to
                their name.
            </Typography>
            <div className={classes.center}>
                <img src={screenshot} className={classes.screenshot} alt={"Assign Roles Page"} onClick={() => setOpen(true)} />
                <figcaption className={classes.description}>Click to enlarge.</figcaption>
            </div>
            <Typography className={classes.description}>
                Once all players are ready, click the "Start Game" button.
            </Typography>
            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
            >
                <img src={screenshot} alt={"Assign Roles Page"} className={classes.enlarged} />
            </Modal>
        </React.Fragment>
    )
};

export default AssigningRoles;