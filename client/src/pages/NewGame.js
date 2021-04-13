/*
UI for creating a new game.
*/

import React, { useState, useEffect } from "react";
import GameInvitation from "../components/GameInvitation"
import { Button } from '@material-ui/core';

function NewGame() {

    return (
        <div>
            <h1>New Game</h1>
            <hr />
            <GameInvitation />
            <br />
            <Button variant="contained" color="secondary">Create Game</Button>
        </div>
    );
}

export default NewGame;