/*
UI for creating a new game.
*/

import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GameInvitation from '../components/GameInvitation';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { MatchContext } from '../ContextProvider/match';
import { Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { SocketContext } from '../ContextProvider/socket';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '50%',
    textAlign: 'center',
    backgroundColor: 'white',
    boxShadow:
      '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)',
    borderRadius: '10px',
    padding: '50px',
    paddingBottom: '80px',
    margin: 'auto',
    marginTop: '9%',
    [theme.breakpoints.down('md')]: {
      width: '60%',
      margine: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      width: '75%',
      margine: 'auto',
      padding: '30px',
      paddingBottom: '50px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      margine: 'auto',
      padding: '20px',
      paddingBottom: '20px',
    },
  },
  header: {
    fontSize: '48px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '28px',
    },
  },
  hr: {
    width: '10%',
    border: '1px solid #00e676',
  },
  spacing: {
    marginTop: '20px',
  },
  background: {
    display: 'flex',
    justifyContent: 'center',
  },
  createButton: {
    width: '160px'
  },
  leaveButton: {
    marginTop: '20px',
    align: 'center',
    width: '160px',
    backgroundColor: '#f44336',
    '&:hover': {
      backgroundColor: '#aa2e25',
    },
    color: 'white',
    WebkitTextStroke: '0.2px black'
  },
  stayButton: {
    marginTop: '30px',
    align: 'center',
    width: '120px',
    color: 'black',
    width: '160px'
  },
  leaveButtonInner: {
    marginLeft: '40px',
    marginTop: '30px',
    align: 'center',
    width: '160px',
    backgroundColor: '#f44336',
    '&:hover': {
      backgroundColor: '#aa2e25',
    },
    color: 'white',
    WebkitTextStroke: '0.2px black'
  },
  modal: {
    textAlign: 'center',
    paddingTop: '20px',
  },
  popupHeader: {
    fontSize: '20px',
  },
  center: {
    justifyContent: 'center'
  }
}));

function NewGame() {
  const history = useHistory();
  const { matchState, setMatchState } = useContext(MatchContext);
  const classes = useStyles();
  const { matchIdParam } = useParams();
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (matchState) {
      if (matchState.inProgress) {
        socket.off('update-game-engine-' + matchState.matchId);
        return history.push(`/gamelayout/${matchState.matchId}`);
      }
      socket.on('update-game-engine-' + matchState.matchId, (game) => {
        setMatchState(game);
      });
    } else {
      socket.emit('get-game-engine', { matchId: matchIdParam });
      socket.on('update-game-engine-' + matchIdParam, (game) => {
        setMatchState(game);
      });
    }
    return () => socket.off('update-game-engine-' + matchIdParam);
  }, [socket, matchState]);

  const createGame = () => {
    history.push(`/lobby/${matchState.matchId}`);
  };

  const [open, setOpen] = React.useState(false);

  const cancelMatch = () => {
    fetch(`/api/match/delete/${matchState.matchId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((responce) => {
        console.log(responce);
      })
      .catch((err) => {
        console.log(err);
      });

    return history.push('/home');
  };

  const CancelMatchPopup = () => (
    <div>
      <Button
        className={classes.leaveButton}
        onClick={() => {
          setOpen(true);
        }}
      >
        Cancel Match
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
          {'Are you canceling the match?'}
        </DialogTitle>

        <DialogActions className={classes.center}>
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
              console.log('CANCEL MATCH');
              cancelMatch();
            }}
            color="primary"
            className={classes.leaveButtonInner}
          >
            Cancel Match
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return (
    <div className={classes.container}>
      <Typography color="textPrimary" className={classes.header}>
        New Game
      </Typography>
      <hr className={classes.hr} />
      <GameInvitation />
      <Button
        variant="contained"
        color="secondary"
        onClick={createGame}
        className={classes.spacing + " " + classes.createButton}
      >
        Create Game
      </Button>
      <CancelMatchPopup />
    </div>
  );
}

export default NewGame;
