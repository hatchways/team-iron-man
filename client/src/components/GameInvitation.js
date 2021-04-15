/*
Component for inviting friends to a new game.
*/

import React, { useState, useEffect } from "react";
import { Grid, Button, makeStyles, Input } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles({

    form: {
        border: "1px solid lightgray",
        borderRadius: "3px",
        padding: "5px"
    },

    input: {
        border: "none",
        width: "80%"
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
        borderRight: "1px solid lightgray"
    }

})

function GameInvitation() {

    const classes = useStyles();

    // States for user input and list of emails invited.
    const [emailInput, setEmailInput] = useState("");
    const [emailList, setEmailList] = useState([]);

    // Updates the state when the user input changes.
    const onInputChange = (e) => {
        setEmailInput(e.target.value);
    }

    // Add the input to the list of emails then clear the input.
    // Need to implement actual sending of the email.
    const sendInvitation = (e) => {

        e.preventDefault();
        // Only if the user input is not empty.
        if (emailInput.length > 0) {
            setEmailList([...emailList, emailInput]);
            setEmailInput("");

            // Implement sending of the actual invitation here.
        }
    }

    return (
        <div>
            <Grid container alignItems="center">
                <Grid item xs={9}>
                    <div className={classes.item + " " + classes.itemLeft}>
                        Invite friends via email:
                        <form onSubmit={sendInvitation} className={classes.form}>
                            <Input value={emailInput} onChange={onInputChange} placeholder="Email address" classes={{ root: classes.input, focused: classes.inputFocused }} disableUnderline />
                            <Button variant="contained" type="submit">Send invite</Button>
                        </form>
                        {emailList.length > 0 &&
                            emailList.map(
                                email =>
                                    <React.Fragment>
                                        <span className={classes.invitation}>&#10004; {email + " invited"}</span>
                                        <br />
                                    </React.Fragment>)}
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className={classes.item}>
                        Or share link:
                        <br /><br />
                        <Button variant="outlined" onClick={() => { navigator.clipboard.writeText("placeholder") }}><LinkIcon />Copy</Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default GameInvitation;