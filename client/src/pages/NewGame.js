/*
UI for creating a new game.
*/

import React from "react";
import GameInvitation from "../components/GameInvitation"
import { Button } from '@material-ui/core';
import "../stylesheets/newgame.css";

function NewGame() {

    // Implement creation of new game in the future.
    const createGame = () => {

    }

    return (
        <div className="container">
            <h1>New Game</h1>
            <hr />
            <GameInvitation />
            <br />
            <Button variant="contained" color="secondary" onClick={createGame}>Create Game</Button>
        </div>
    );
}

export default NewGame;