/*
UI for Game Board
*/

import React, { useContext, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "./Card";
import { useParams } from "react-router-dom";
import { MatchContext } from '../ContextProvider/match';
import { useUserState } from "../ContextProvider/user";
import io from "socket.io-client";

const useStyles = makeStyles({
    root: {
        width: "100%",
        border: "1px solid black",
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
    },
    container: {
        width: "100%",
        height: "100%",
        display: "grid",
        gridColumnGap: "30px",
        alignItems: "center",
        justifyContent: "center",
        gridTemplateColumns: "auto auto auto auto auto",
    },
});

export default function GameBoard() {
    const classes = useStyles();
    const { email } = useUserState();
    const { matchState, setMatchState } = useContext(MatchContext);
    const socketRef = useRef();
    const { matchId } = useParams();
    // TODO: integrate with backend.
    //function onCardClick() {
    //}

    useEffect(() => {
        socketRef.current = io.connect("/");
        if (!matchState) {
            socketRef.current.emit("get-game-engine", { matchId });
            socketRef.current.on("update-game-engine-" + matchId, (game) => {
                setMatchState(game);
            });
        }
    }, [matchState, setMatchState, matchId])

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                {matchState && matchState.board.map(function (row) {
                    return row.map((card) => (
                        <Card
                            key={card.word}
                            word={card.word}
                            color={card.color}
                            spyMaster={email === matchState.redSpymaster.email || email === matchState.blueSpymaster.email}
                            revealed={card.revealed}
                            onClick={() => console.log("sadsaddas")}
                        />
                    ));
                })}
            </div>
        </div>
    );
}
