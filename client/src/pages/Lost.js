/*
UI for lost page.
*/

import React, { useEffect, useContext } from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { MatchContext } from "../ContextProvider/match";

const useStyles = makeStyles({
    container: {
        width: "40%",
        textAlign: "center",
        backgroundColor: "white",
        boxShadow:
            "0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)",
        borderRadius: "10px",
        padding: "50px",
        paddingBottom: "80px",
        margin: 'auto',
        marginTop: "9%",
    },
    header: {
        fontWeight: "600",
        fontSize: "48px",
    },

    hr: {
        width: "10%",
        border: "1px solid #00e676",
        marginBottom: '20px'
    },
    button: {
        margin: "auto",
        marginTop: "50px",
        display: "block",
    },
    left: {
        textAlign: 'left',
    },
});

function Lost() {
    const classes = useStyles();
    const history = useHistory();
    const { setMatchState } = useContext(MatchContext);

    //Reset the state
    useEffect(() => {
        setMatchState(null);
    }, [])

    return (
        <div className={classes.container}>
            <Typography color="textPrimary" className={classes.header}>
                You Must Be Lost!
            </Typography>
            <hr className={classes.hr} />
            <div className={classes.left}>
                <Typography color="textPrimary">
                    You tried to join a match that does not exist, or a match already in progress, or a match you were not invited to.
            </Typography>
            </div>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => history.push('/home')}
            >
                Return To Home
            </Button>
        </div>
    );
}

export default Lost;
