/*
Component for inviting friends to a new game.
*/

import React, { useState, useEffect } from "react";
import { Grid, Button } from '@material-ui/core';

function GameInvitation() {
    return (
        <div>
            <h2>Invite friends via email:</h2>
            <form>
                <input></input><Button variant="contained">Send invite</Button>
            </form>
            <h2>Or share link:</h2>
            <Button variant="outlined">Copy</Button>
        </div>
    );
}

export default GameInvitation;