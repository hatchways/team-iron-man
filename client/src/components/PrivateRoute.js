import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { MatchContext } from '../ContextProvider/match';
import { useUserState } from "../ContextProvider/user";

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { matchState } = useContext(MatchContext);
    const { email } = useUserState();

    const checkIfUserInMatch = () => {
        if (matchState.hasOwnProperty('notFound')) { return false }
        const userAllowed = ((!matchState.inProgress && matchState.invitedPlayers.findIndex((player) => player.email === email) !== -1) ||
            (matchState.redSpymaster.email === email ||
                matchState.blueSpymaster.email === email ||
                matchState.redGuessers.findIndex((player) => player.email === email) !== -1 ||
                matchState.blueGuessers.findIndex((player) => player.email === email) !== -1
            ));
        return userAllowed;
    }

    return (
        <Route  {...rest} render={props => (
            matchState && !checkIfUserInMatch() ?
                <Redirect to="/lost" /> :
                <Component {...props} />
        )} />
    )
};
export default PrivateRoute;