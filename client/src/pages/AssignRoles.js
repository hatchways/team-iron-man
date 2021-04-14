/*
UI for assigning roles.
*/

import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import AvailableRoles from '../components/AvailableRoles';

const useStyles = makeStyles({
    container: {
        display: 'flex',
	    flexDirection: 'column',
        margin: 'auto',
        width: '50%',
        textAlign: 'center',
        backgroundColor: 'white',
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)',
        borderRadius: '10px',
        padding: '1%',
        paddingBottom: '3%'
      },
    hr: {
        width: '10%',
        border: '1px solid #00e676'
    },
    button: {
        marginLeft: '300px',
        align: 'center',
        width: '120px'
    }
});

export default function AssignRoles() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <h1>New Game</h1>
            <hr className={classes.hr}/>
            <h2>Available Roles</h2>
            <AvailableRoles />
            <Button className={classes.button} variant="contained" color="secondary" disabled>Start Game</Button>
        </div>
    );
}
