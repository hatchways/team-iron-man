import React, { useContext, useState, useEffect } from 'react';
import { MatchContext } from '../ContextProvider/match';
import { useUserState } from '../ContextProvider/user';
import { Button, Snackbar, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const initialRole = {
  color: '',
  phase: '',
};

const useStyles = makeStyles({
  margin: {
    marginTop: "3%",
  }
})

const UserPrompt = () => {
  const [role, setRole] = useState(initialRole);
  const [snackbarOpen, setSnackbarOpen] = useState(true);
  const { email } = useUserState();
  const { matchState } = useContext(MatchContext);
  const classes = useStyles()

  useEffect(() => {
    setSnackbarOpen(true);
    if (matchState.redSpymaster.email === email) {
      setRole({ color: 'Red', phase: 'clue' });
    } else if (matchState.blueSpymaster.email === email) {
      setRole({ color: 'Blue', phase: 'clue' });
    } else if (
      matchState.blueGuessers.find((player) => player.email === email)
    ) {
      setRole({ color: 'Blue', phase: 'guess' });
    } else {
      setRole({ color: 'Red', phase: 'guess' });
    }
  }, [
    email,
    matchState.blueGuessers,
    matchState.blueSpymaster.email,
    matchState.redSpymaster.email,
  ]);


  const renderSwitch = () => {
    switch (role.phase) {
      case 'guess':
        return `It is the ${role.color} Guesser's turn now.`;
      case 'clue':
        return `It is the ${role.color} Spy Master's turn now.`;
      default:
        return `Please make sure you were assigned a role`;
    }
  };

  return (
    <div>
      <Snackbar
        open={
          ((matchState.turn === "blue" &&
            matchState.turnPhase === "guess" &&
            matchState.blueGuessers.findIndex(
              (player) => player.email === email
            ) !== -1) ||
            (matchState.turn === "red" &&
              matchState.turnPhase === "guess" &&
              matchState.redGuessers.findIndex(
                (player) => player.email === email
              ) !== -1) ||
            (matchState.turn === "blue" &&
              matchState.turnPhase === "clue" &&
              matchState.blueSpymaster.email === email) ||
            (matchState.turn === "red" &&
              matchState.turnPhase === "clue" &&
              matchState.redSpymaster.email === email)) && snackbarOpen
        }
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        className={classes.margin}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={matchState.turn === "blue" ? 'info' : 'error'} variant="filled">
          {renderSwitch()}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserPrompt;
