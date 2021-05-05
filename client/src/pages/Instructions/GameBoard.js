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

function GameBoard() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const hidden = "https://res.cloudinary.com/du081ilw3/image/upload/v1620200462/Screenshots/hidden_ijtsmn.png";
    const revealed = "https://res.cloudinary.com/du081ilw3/image/upload/v1620200462/Screenshots/revealed_j9jzss.png";
    const screenshot = "https://res.cloudinary.com/du081ilw3/image/upload/v1620201290/Screenshots/board_smrbnm.png";

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <Typography className={classes.header}>
                Game Board
            </Typography>
            <Typography className={classes.description}>
                The game board consists of 25 cards arranged in a 5 x 5 grid. Cards are divided into
                blue cards (for the blue team), red cards (for the red team), white cards (neutral),
                and black cards. By default the split is: nine blue, eight red, seven white, and
                one black. The blue team has an extra card because they go first by default.
            </Typography>
            <div className={classes.center}>
                <img src={screenshot} className={classes.screenshot} onClick={() => setOpen(true)} />
                <figcaption className={classes.description}>Click to enlarge.</figcaption>
            </div>
            <Typography className={classes.description}>
                All cards have are initially "unrevealed". Guessers will see the unrevealed cards
                with a white background and gray text, while spymasters will see a white card with
                colored text depending on what the true color of the card is (neutral cards will
                have a gray test for the spymaster to prevent white on white).
            </Typography>
            <div className={classes.center}>
                <img src={hidden} className={classes.figure} />
                <figcaption className={classes.description}>Hidden cards. Left: Guesser view. Right: Spymaster view (Blue Team)</figcaption>
            </div>
            <Typography className={classes.description}>
                Revealed cards will have their background change to their true color which will
                be showed to all players.
            </Typography>
            <div className={classes.center}>
                <img src={revealed} className={classes.figure} />
                <figcaption className={classes.description}>Revealed cards.</figcaption>
            </div>
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

export default GameBoard;