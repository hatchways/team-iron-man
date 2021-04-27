/*
UI for assigning roles.
*/

import React, { useContext, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import AvailableRoles from '../components/AvailableRoles';
import { MatchContext } from '../ContextProvider/match';
import io from "socket.io-client";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        marginTop: '30px',
        width: '50%',
        textAlign: 'center',
        backgroundColor: 'white',
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)',
        borderRadius: '10px',
        padding: '1%',
        paddingBottom: '3%',
        justifyContent: "center",
        alignItems: "center"
    },
    hr: {
        width: '10%',
        border: '1px solid #00e676'
    },
    button: {
        align: 'center',
        width: '120px'
    }
});

export default function AssignRoles() {

    const { matchState } = useContext(MatchContext);
    const classes = useStyles();
    const socketRef = useRef();
    socketRef.current = io.connect("/");

    // TODO: make button disabled unless minimum 4 players (1 in each role) is assigned
    const startGame = () => {
        socketRef.current.emit("set-match-in-progress", { matchId: matchState.matchId });
        return () => socketRef.current.disconnect();
    }

    return (
        <React.Fragment>
            <div className={classes.container}>
                <h1>New Game</h1>
                <hr className={classes.hr} />
                <h2>Available Roles</h2>
                <AvailableRoles />
                <Button className={classes.button} variant="contained" color="secondary" onClick={startGame}>Start Game</Button>
            </div>

        </React.Fragment>

    );
}
