import React, { useState, useRef, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, TextField, Button, Typography } from '@material-ui/core/';
import io from "socket.io-client";
import { MatchContext } from '../ContextProvider/match';
import { useUserState } from "../ContextProvider/user";

const useStyles = makeStyles({
    modal: {
        width: "50%"
    }
})


const ClueModal = () => {
    const classes = useStyles();
    const [phase, setPhase] = useState("clue")
    const [open, setOpen] = useState(false);
    const [clue, setClue] = useState("");
    const socketRef = useRef();
    const { matchState, setMatchState } = useContext(MatchContext);
    socketRef.current = io.connect('/');

    useEffect(() => {
        console.log(matchState.turnPhase)
        if (matchState.turnPhase === "clue") {
            handleOpen()
        }
    }, [matchState.turnPhase])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        socketRef.current.emit('set-clue', { matchId: matchState.matchId, clue });
        socketRef.current.on(`update-game-engine-${matchState.matchId}`, (game) => {
            setMatchState(game);
        });
        setOpen(false);
    };

    const handleChange = (e) => {
        setClue(e.target.value);
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            disableBackdropClick
            disableEscapeKeyDown
        >
            <React.Fragment>
                <Typography variant="h6">Enter a Clue Word:</Typography>
                <TextField
                    value={clue}
                    onChange={handleChange}
                />
                <Button onClick={handleClose} variant="contained">Give Clue</Button>
            </React.Fragment>

        </Modal>
    );
}

export default ClueModal;