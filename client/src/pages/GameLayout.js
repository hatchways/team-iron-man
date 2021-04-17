import { FormControl, TextField, Button, Typography } from "@material-ui/core";

import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Chat from '../components/Chat';
import Board from '../components/Board';

function GameLayout(props) {

    return (
        <Grid container>
            <Grid item xs={3}>
                <Chat />
            </Grid>
            <Grid item xs={9}>
                <Board />
            </Grid>
        </Grid>
    );
}

export default GameLayout;