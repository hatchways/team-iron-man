/*
UI for Game Board
*/

import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      marginTop: '20px',
      display: 'grid',
      gridTemplateColumns: 'auto auto auto auto auto'
    },
    paper: {
      height: 80,
      width: 150,
      textAlign: 'center',
      fontSize: '20px',
      paddingTop: '15%'
    }
});

export default function GameBoard() {
    const classes = useStyles();
    let testData = [];
    for (let i = 1; i < 26; i++) {
        testData.push(i);
    }
    return ( 
        <React.Fragment>
            <Grid container className={classes.root} justify="center" spacing={2}>
                {testData.map((value) => (
                    <Grid key={value} item>
                        <Paper className={classes.paper}>{value}</Paper>
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    );
}