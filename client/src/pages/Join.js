/*
UI for home page.
*/

import React, { useContext, useRef, useState } from "react";
import { Button, makeStyles, Typography, TextField } from "@material-ui/core";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";
//import { MatchContext } from '../ContextProvider/match';

const useStyles = makeStyles({
    container: {
        width: "50%",
        textAlign: "center",
        backgroundColor: "white",
        boxShadow:
            "0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)",
        borderRadius: "10px",
        padding: "50px",
        paddingBottom: "80px",
        marginLeft: "25%",
        marginTop: "9%",
    },

    header: {
        fontWeight: "600",
        fontSize: "48px",
    },

    hr: {
        width: "10%",
        border: "1px solid #00e676",
    },
    button: {
        marginTop: "50px",
    },
    block: {
        alignItems: "center",
        justifyContent: "center",
    },
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    instructions: {
        marginTop: "50px",
        marginBottom: "10px",
        textAlign: "left",
        fontStyle: "italic",
        color: "gray",
    },
    input: {
        width: "100%",
    },
});

function Join() {
    const classes = useStyles();
    const history = useHistory();
    //const { setMatchState } = useContext(MatchContext) will need when the match context provider is done
    const socketRef = useRef();
    socketRef.current = io.connect("http:localhost:3002/"); //will change when the final version is merged
    const [matchId, setMatchId] = useState("");

    const onTextChange = (e) => {
        setMatchId(e.target.value);
    };

    const submitMatchId = (e) => {
        e.preventDefault();
        // TODO: call api route for joining match
        socketRef.current.emit("join-match", { matchId });
        socketRef.current.on("join-game-engine", (game) => {
            //setMatchState(game);
            socketRef.current.disconnect();
        });
        return history.push(`/join/${matchId}`);
    };

    return (
        <div className={classes.container}>
            <Typography color="textPrimary" className={classes.header}>
                Join A Match
      </Typography>
            <hr className={classes.hr} />
            <form className={classes.center} onSubmit={submitMatchId}>
                <div className={classes.block}>
                    <Typography className={classes.instructions}>
                        Enter a valid match ID below or paste the link into your browser.
          </Typography>
                    <TextField
                        value={matchId}
                        onChange={onTextChange}
                        variant="outlined"
                        placeholder="Enter a match ID"
                        className={classes.input}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        className={classes.button}
                        disabled={matchId.length === 0}
                    >
                        Join Game
          </Button>
                </div>
            </form>
        </div>
    );
}

export default Join;
