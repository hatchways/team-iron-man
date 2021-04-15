/*
Component for inviting friends to a new game.
*/

import React, { useState } from "react";
import { Grid, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles({

    block: {
        display: "block",
    },

    form: {
        border: "1px solid lightgray",
        borderRadius: "3px",
        padding: "5px"
    },

    input: {
        border: "none",
        width: "100%"
    },

    inputFocused: {
        outline: "none",
        border: "none"
    },

    invitation: {
        textAlign: "left",
        fontStyle: "italic",
        color: "gray"
    },

    item: {
        marginTop: "50px",
        marginBottom: "50px",
        padding: "10px"
    },

    itemLeft: {
        textAlign: "left",
        paddingRight: "80px",
        paddingLeft: "50px",
        borderRight: "1px solid lightgray",
    },
    spacingTop: {
        marginTop: "2em",
    },
    submitButton: {
        width: "150px",
    }
})

function GameInvitation() {

    const classes = useStyles();

    const [emailInput, setEmailInput] = useState("");
    const [emailList, setEmailList] = useState([]);


    const onInputChange = (e) => {
        setEmailInput(e.target.value);
    }

    const sendInvitation = (e) => {

        e.preventDefault();
        if (emailInput.length > 0) {
            setEmailList([...emailList, emailInput]);
            setEmailInput("");

            // TODO: Implement sending of the actual invitation here.
        }
    }

    return (
        <div>
            <Grid container alignItems="center">
                <Grid item xs={9}>
                    <div className={classes.item + " " + classes.itemLeft}>
                        <Typography>Invite friends via email:</Typography>
                        <form onSubmit={sendInvitation}>
                            <TextField
                                value={emailInput}
                                id="email-address"
                                onChange={onInputChange}
                                placeholder="Email address"
                                className={classes.input}
                                variant="outlined"
                                type="email"
                                helperText="Please enter a valid email address."
                                InputProps={{ endAdornment: <Button variant="contained" type="submit" className={classes.submitButton}>Send Invite</Button> }}
                            />

                        </form>
                        {emailList.length > 0 &&
                            emailList.map(
                                email =>
                                    <Typography className={classes.invitation + " " + classes.block}>&#10004; {email + " invited"}</Typography>)}

                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className={classes.item + " " + classes.block}>
                        <Typography>Or share link:</Typography>
                        <Button variant="outlined" onClick={() => { navigator.clipboard.writeText("placeholder") }} className={classes.spacingTop}><LinkIcon />&nbsp;Copy</Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default GameInvitation;
