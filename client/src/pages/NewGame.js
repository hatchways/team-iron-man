/*
UI for creating a new game.
*/

import React, { useState, useEffect } from "react";
import GameInvitation from "../components/GameInvitation"
import { Button } from '@material-ui/core';
import "../stylesheets/newgame.css";

function NewGame() {

    return (
        <div className="container">
            <h1>New Game</h1>
            <hr />
            <GameInvitation />
            <br />
            <Button variant="contained" color="secondary">Create Game</Button>
        </div>
    );
}

export default NewGame;