import React from "react";
import { Grid } from "@material-ui/core";
import Chat from '../pages/Chat';
import GameBoard from '../components/GameBoard';

function GameLayout(props) {

    return (
        <Grid container>
            <Grid item xs={12}>
                <GameBoard />
            </Grid>
        </Grid>
    );
}

export default GameLayout;