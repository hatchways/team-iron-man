/*
UI for assigning roles.
*/

import React, { useContext, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import AvailableRoles from '../components/AvailableRoles';
import { MatchContext } from '../ContextProvider/match';
import io from 'socket.io-client';

import { Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    marginTop: '30px',
    width: '50%',
    textAlign: 'center',
    backgroundColor: 'white',
    boxShadow:
      '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)',
    borderRadius: '10px',
    padding: '1%',
    paddingBottom: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '60%',
      marginTop: '5vh'
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  hr: {
    width: '10%',
    border: '1px solid #00e676',
  },
  button: {
    align: 'center',
    width: '120px',
    marginTop: '30px'
  },
  header: {
    fontSize: "48px",
  },
  subheader: {
    fontSize: "24px",
  },
  leaveButton: {
    marginTop: '20px',
    align: 'center',
    width: '120px',
    backgroundColor: '#f23f3f',
    color: 'white',
  },
  stayButton: {
    marginTop: '30px',
    align: 'center',
    width: '120px',
    color: 'black',
  },
  leaveButtonInner: {
    marginLeft: '40px',
    marginTop: '30px',
    align: 'center',
    width: '120px',
    backgroundColor: '#f23f3f',
    color: 'white',
  },
  modal: {
    textAlign: 'center',
    paddingTop: '20px',
  },
  popupHeader: {
    fontSize: '20px',
    color: 'red',
  },
}));

export default function AssignRoles() {
  const { matchState } = useContext(MatchContext);
  const classes = useStyles();

  const history = useHistory();

  const askForLeave = async () => {
    fetch(`/api/match/delete/${matchState.matchId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((err) => {
      console.log(err);
    });

    return history.push('/home');
  };

  const [open, setOpen] = React.useState(false);

  const AskForLeavePopup = () => (
    <div>
      <Button
        className={classes.leaveButton}
        onClick={() => {
          setOpen(true);
        }}
      >
        Leave Match
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.modal}
      >
        <DialogTitle id="alert-dialog-title" className={classes.popupHeader}>
          {'Are you leaving the match?'}
        </DialogTitle>

        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            className={classes.stayButton}
            variant="contained"
            color="secondary"
          >
            Stay
          </Button>
          <Button
            onClick={() => {
              askForLeave();
            }}
            color="primary"
            className={classes.leaveButtonInner}
          >
            Leave Match
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  const socketRef = useRef();
  socketRef.current = io.connect('/');

  // TODO: make button disabled unless minimum 4 players (1 in each role) is assigned
  const startGame = () => {
    socketRef.current.emit('set-match-in-progress', {
      matchId: matchState.matchId,
    });
    return () => socketRef.current.disconnect();
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <h1>New Game</h1>
        <hr className={classes.hr} />
        <h2>Available Roles</h2>
        <AvailableRoles />
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={startGame}
        >
          Start Game
        </Button>
        <AskForLeavePopup />
      </div>
    </React.Fragment>
  );
}
