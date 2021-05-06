/*
UI for assigning roles.
*/

import React, { useContext, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import AvailableRoles from '../components/AvailableRoles';
import { MatchContext } from '../ContextProvider/match';
import io from "socket.io-client";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        marginTop: '10vh',
        width: '50%',
        textAlign: 'center',
        backgroundColor: 'white',
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)',
        borderRadius: '10px',
        padding: '1%',
        paddingBottom: '2%',
        justifyContent: "center",
        alignItems: "center",
        '@media (max-width:960px)': {
            width: '80%'
        }
    },
    hr: {
        width: '50%',
        border: '1px solid #00e676'
    },
    button: {
        align: 'center',
        width: '120px',
        marginTop: '30px'
    },
    header: {
        fontSize: "48px",
    },
    subheader: {
        fontSize: "24px",
    },
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
                <Typography color="textPrimary" className={classes.header}>
                    Game Lobby
                </Typography>
                <hr className={classes.hr} />
                <Typography color="textPrimary" className={classes.subheader}>
                    Select Your Roles
                </Typography>
                <AvailableRoles />
                <Button className={classes.button} variant="contained" color="secondary" onClick={startGame}>Start Game</Button>
            </div>

        </React.Fragment>

    );
}
