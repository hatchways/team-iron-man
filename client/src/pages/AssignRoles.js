/*
UI for assigning roles.
*/

import React from "react";
import { Button } from '@material-ui/core';
import "../styles/assignRoles.css";
import AvailableRoles from '../components/AvailableRoles';

export default function AssignRoles() {

    return (
        <div className="container">
            <h1>New Game</h1>
            <hr />
            <h2>Available Roles</h2>
            <AvailableRoles />
            <br />
            <Button variant="contained" color="secondary" disabled>Start Game</Button>
        </div>
    );
}
