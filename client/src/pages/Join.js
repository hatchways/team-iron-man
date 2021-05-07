/*
UI for home page.
*/

import React, { useContext, useRef, useState, useEffect } from 'react';
import {
  Button,
  makeStyles,
  Typography,
  TextField,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import io from 'socket.io-client';
import { useHistory, useParams } from 'react-router-dom';
import { MatchContext } from '../ContextProvider/match';

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
    },
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },

  header: {
    fontWeight: '600',
    fontSize: '48px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '38px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '28px',
    },
  },

  hr: {
    width: '10%',
    border: '1px solid #00e676',
  },
  button: {
    marginTop: '50px',
  },
  block: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    marginTop: '50px',
    marginBottom: '10px',
    textAlign: 'left',
    fontStyle: 'italic',
    color: 'gray',
  },
  input: {
    width: '100%',
  },
}));

function Join() {
  const classes = useStyles();
  const history = useHistory();
  const { setMatchState } = useContext(MatchContext);
  const socketRef = useRef();
  socketRef.current = io.connect('/');
  const [matchId, setMatchId] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [join, setJoin] = useState(false);
  const [joinError, setJoinError] = useState('');
  const { matchIdParam } = useParams();

  useEffect(() => {
    if (join) {
      console.log('SOCKET');
      socketRef.current.emit('join-match', { matchId });
      socketRef.current.on('join-game-engine', (game) => {
        setMatchState(game);
      });
    }
    return () => {
      socketRef.current.off('join-game-engine');
    };
  }, [join]);

  useEffect(() => {
    setMatchId(matchIdParam ? matchIdParam : '');
  }, []);

  const onTextChange = (e) => {
    setMatchId(e.target.value);
  };

  const submitMatchId = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/match/join/${matchId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response.status);
      const data = await response.json();
      if (response.status === 200) {
        setJoin(true);
        history.push(`/lobby/${matchId}`);
      } else {
        console.log(data.message);
        throw data.message;
      }
    } catch (error) {
      console.log(error);
      setJoinError('Please provide a valid match ID.');
      setSnackbarOpen(true);
    }
  };

  return (
    <div className={classes.container}>
      <Typography color="textPrimary" className={classes.header}>
        Join A Match
      </Typography>
      <hr className={classes.hr} />
      <form className={classes.center} onSubmit={submitMatchId}>
        <div className={classes.block}>
          <Typography className={classes.instructions}>
            Enter a valid match ID below or paste the link into your browser.
          </Typography>
          <TextField
            value={matchId}
            onChange={onTextChange}
            variant="outlined"
            placeholder="Enter a match ID"
            className={classes.input}
          />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            className={classes.button}
            disabled={matchId.length === 0}
          >
            Join Game
          </Button>
        </div>
      </form>
      <Snackbar open={snackbarOpen}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="error">
          {joinError}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Join;
