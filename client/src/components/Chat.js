import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({

    root: {
        width: "100%",
        border: "1px solid black",
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
    },

    container: {
        width: "100%",
        height: "100%",
        boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)",
        borderRadius: "10px",
        position: "relative"
    }


})

const Chat = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.container}>

            </div>
        </div>
    );
}

export default Chat;