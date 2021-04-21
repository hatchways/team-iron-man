/*
UI for Game Board
*/

import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      marginTop: '20px',
      marginLeft: '20%',
      width: '60%',
      display: 'grid',
      gridTemplateColumns: 'auto auto auto auto auto'
    },
    element: {
        marginBottom: '10px'
    },
    box: {
      height: 90,
      width: '90%',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      cursor: 'pointer',
      borderRadius: '10px',
      textAlign: 'center',
      paddingTop: '20%'
    }
});

export default function GameBoard() {
    const classes = useStyles();
    let testData = [];
    for (let i = 1; i < 26; i++) {
        testData.push(i);
    }

    function handleColor(event) {
        event.preventDefault = 'none';
        let bgColor = event.target.style.backgroundColor;
        if (bgColor === 'grey') {
            event.target.style.backgroundColor = 'white';
        } else {
            event.target.style.backgroundColor = 'grey';
        }
    }

    return (
        <React.Fragment>
            <div container className={classes.root}>
            {testData.map((value) => (
                    <div key={value} className={classes.element}>
                        <Box onClick={handleColor} className={classes.box}>
                            {value}
                        </Box>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
}