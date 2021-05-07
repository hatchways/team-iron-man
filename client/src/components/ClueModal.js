import React, { useState, } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, TextField, Button, Typography } from "@material-ui/core/";

const useStyles = makeStyles({
    modal: {
        width: "40%",
        height: "50%",
        margin: "auto",
        backgroundColor: "white",
        boxShadow:
            "0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        borderRadius: "10px",
    },
    container: {
        display: "flex",
        margin: "auto",
        justifyContent: "center",
        borderRadius: "10px",
        textAlign: "center",
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        padding: "50px",
        flexDirection: "column",
    },
    header: {
        marginBottom: "20px",
    },
    input: {
        width: "100%",
        marginBottom: "20px",
    },
    button: {
        marginLeft: '10px'
    },
});

const ClueModal = (props) => {
    const classes = useStyles();
    const [clue, setClue] = useState("");
    const [numOfGuesses, setNumOfGuesses] = useState(1);

    const [oneWordHelperText, setOneWordHelperText] = useState(null);
    const [errorState, setErrorState] = useState(false);

    const handleChange = (e) => {
        setClue(e.target.value);
    };

    const changeGuesses = (e) => {
        setNumOfGuesses(e.target.value);
    }

    const isOneAlphabeticWord = (word) => {
        const english = /^[A-Za-z]*$/;
        return english.test(word);
    }
    const isCardWord = (word) => {
        const cards = props.cards;

        for (let i = 0; i < cards.length; i++) {
          const findCardWord = cards[i].find(
            card => card.word.toLowerCase() === word.trim().toLowerCase()
          );
          if (findCardWord){return true;}
        }
        return false;

    }

    const handleClose = () => {
        setClue("");
        if (isCardWord(clue)){
            setErrorState(true);
            setOneWordHelperText("Please enter valid clue word");
            return;
        }
        else if (isOneAlphabeticWord(clue)){
            props.submitClue(clue, parseInt(numOfGuesses));
        }
        else {
            setErrorState(true);
            setOneWordHelperText("One alphabetic word only, please retry");
        }
    }

    return (
        <Modal
            open={props.open}
            onClose={handleClose}
            className={classes.modal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            disableBackdropClick
            disableEscapeKeyDown
        >
            <div className={classes.container}>
                <div className={classes.center}>
                    <Typography variant="h6" className={classes.header}>
                        Enter a Clue Word:
                    </Typography>
                    <TextField
                        id="filled-number"
                        label="Max Number of Guesses"
                        type="number"
                        InputProps={{ inputProps: { min: "0", max: "5", step: "1" } }}
                        value={numOfGuesses}
                        onChange={changeGuesses}
                        className={classes.input}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        className={classes.input}
                        label="Clue Word"
                        value={clue}
                        onChange={handleChange}
                        variant="outlined"
                        error={errorState}
                        helperText={oneWordHelperText}
                    />
                    <Button className={classes.button} onClick={handleClose} color="secondary" variant="contained" disabled={!clue}>
                        Give Clue
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ClueModal;
