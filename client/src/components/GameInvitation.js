/*
Component for inviting friends to a new game.
*/

import React, { useState, useEffect } from "react";
import { Grid, Button } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

function GameInvitation() {

    // States for user input and list of emails invited.
    const [emailInput, setEmailInput] = useState("");
    const [emailList, setEmailList] = useState([]);

    // Updates the state when the user input changes.
    const onInputChange = (e) => {
        setEmailInput(e.target.value);
    }

    // Add the input to the list of emails then clear the input.
    // Need to implement actual sending of the email.
    const sendInvitation = () => {

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
                    <div className="item item-left">
                        Invite friends via email:
                        <form>
                            <input value={emailInput} onChange={onInputChange} placeholder="Email address" />
                            <Button variant="contained" onClick={sendInvitation}>Send invite</Button>
                        </form>
                        {emailList.length > 0 &&
                            emailList.map(
                                email =>
                                    <React.Fragment>
                                        <span className="invitation">&#10004; {email + " invited"}</span>
                                        <br />
                                    </React.Fragment>)}
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className="item">
                        Or share link:
                        <br /><br />
                        <Button variant="outlined"><LinkIcon />Copy</Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default GameInvitation;