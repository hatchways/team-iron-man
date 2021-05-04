/*
UI for Game Board
*/

import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "./Card";
import GameOverModal from './GameOverModal';
import { MatchContext } from '../ContextProvider/match';
import { useUserState } from "../ContextProvider/user";

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
    const { matchState } = useContext(MatchContext);
    // TODO: integrate with backend.
    //function onCardClick() {
    //}

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                {matchState.board.map(function (row) {
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
                <GameOverModal />
            </div>
        </div>
    );
}
