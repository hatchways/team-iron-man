/*
Component for inviting friends to a new game.
*/

import React, { useState, useEffect } from "react";
import { Grid, Button, Icon } from '@material-ui/core';

function GameInvitation() {


    const [emailInput, setEmailInput] = useState("");
    const [emailList, setEmailList] = useState([]);

    const onInputChange = (e) => {
        setEmailInput(e.target.value);
    }

    const sendInvitation = () => {
        setEmailList([...emailList, emailInput]);
        setEmailInput("");
    }

    return (
        <div>
            <h2>Invite friends via email:</h2>
            <form>
                <input value={emailInput} onChange={onInputChange} placeholder="Email address" />
                <Button variant="contained" onClick={sendInvitation}>Send invite</Button>
            </form>
            {emailList.length > 0 &&
                emailList.map(
                    email =>
                        <React.Fragment>
                            <span className="invitation">{email + " invited"}</span>
                            <br />
                        </React.Fragment>)}
            <h2>Or share link:</h2>
            <Button variant="outlined">Copy</Button>
        </div>
    );
}

export default GameInvitation;