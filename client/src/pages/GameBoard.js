/*
UI for Game Board
*/

import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles({
    root: {
    //   flexGrow: 1,
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
      border: '2px solid',
      borderRadius: '10px'
    },
    value: {
        textAlign: 'center',
        fontSize: '20px',
        paddingTop: '25px'
    }
});

export default function GameBoard() {
    let [bgColor, setBgColor] = useState('');
    const classes = useStyles();
    let testData = [];
    for (let i = 1; i < 26; i++) {
        testData.push(i);
    }

    function handleColor(color) {
        if (bgColor === 'grey') {
            bgColor = setBgColor('white');
        } else {
            bgColor = setBgColor(color);
        }
    }

    return (
        <React.Fragment>
            <div container className={classes.root}>
            {testData.map((value) => (
                    <div key={value} className={classes.element}>
                        <Box id={value} onClick={() => handleColor('grey')} style={{backgroundColor: bgColor}} className={classes.box}>
                           <Typography className={classes.value}>{value}</Typography>
                        </Box>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
}