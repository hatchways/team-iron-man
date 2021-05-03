import React, { useContext, useState, useEffect } from 'react';
import { MatchContext } from '../ContextProvider/match';
import { useUserState } from '../ContextProvider/user';
import { Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const initialRole = {
  color: '',
  phase: '',
};

const UserPrompt = () => {
  const [role, setRole] = useState(initialRole);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { email } = useUserState();
  const { matchState } = useContext(MatchContext);

  useEffect(() => {
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
        return `It is ${role.color} Guesser's turn now.`;
      case 'clue':
        return `It is ${role.color} Spy Master's turn now.`;
      default:
        return `Please make sure you were assigned a role`;
    }
  };

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="info">
          {renderSwitch()}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserPrompt;
