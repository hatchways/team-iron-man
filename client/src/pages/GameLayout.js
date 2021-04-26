import React from "react";
import { Grid } from "@material-ui/core";
import Chat from '../pages/Chat';
import GameBoard from '../components/GameBoard';

function GameLayout(props) {

    return (
        <Grid container>
            <Grid item xs={3}>
                <Chat />
            </Grid>
            <Grid item xs={9}>
                <GameBoard />
            </Grid>
        </Grid>
    );
}

export default GameLayout;