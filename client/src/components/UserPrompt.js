import React, { useContext, useState, useEffect } from 'react';
import { MatchContext } from '../ContextProvider/match';
import { useUserState } from '../ContextProvider/user';
import { Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const initialRole = {
  color: '',
  title: '',
  phase: '',
};

const UserPrompt = () => {
  const [role, setRole] = useState(initialRole);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { email } = useUserState();
  const { matchState } = useContext(MatchContext);

  useEffect(() => {
    if (matchState.redSpymaster.email === email) {
      setRole({ color: 'Red', phase: 'clue', title: 'Spy Master' });
    } else if (matchState.blueSpymaster.email === email) {
      setRole({ color: 'Blue', phase: 'clue', title: 'Spy Master' });
    } else if (
      matchState.blueGuessers.find((player) => player.email === email)
    ) {
      setRole({ color: 'Blue', phase: 'guess', title: 'Guesser' });
    } else {
      setRole({ color: 'Red', phase: 'guess', title: 'Guesser' });
    }
  }, [
    email,
    matchState.blueGuessers,
    matchState.blueSpymaster.email,
    matchState.redSpymaster.email,
  ]);

  const checkTurn = () => {
    setSnackbarOpen(
      matchState.turn === role.color.toLowerCase() &&
        matchState.turnPhase === role.phase
    );
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={() => checkTurn()}>
        Test Prompt
      </Button>
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="info">
          It is {role.color} {role.title}'s turn now.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserPrompt;
