/*
UI for home page.
*/

import React, { useContext, useRef } from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import io from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import { useUserState } from '../ContextProvider/user';
import { MatchContext } from '../ContextProvider/match';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '25%',
    textAlign: 'center',
    backgroundColor: 'white',
    boxShadow:
      '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)',
    borderRadius: '10px',
    padding: '50px',
    paddingBottom: '80px',
    margin: 'auto',
    marginTop: '5vh',
    [theme.breakpoints.down('md')]: {
      width: '40%',
      margineLeft: '30%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '60%',
      margine: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      margine: 'auto',
    },
  },
  header: {
    fontWeight: '600',
    fontSize: '48px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '30px',
    },
  },

  hr: {
    width: '10%',
    border: '1px solid #00e676',
  },
  button: {
    margin: 'auto',
    marginTop: '50px',
    display: 'block',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '80%'
  }
}));

function Home() {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useUserState();
  const { setMatchState } = useContext(MatchContext);
  const socketRef = useRef();
  socketRef.current = io.connect('/');

  const newGame = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    try {
      const response = await fetch(`/api/match/create`, requestOptions);
      const data = await response.json();
      if (response.status === 200) {
        socketRef.current.emit('create-game-engine', {
          user,
          matchId: data.match,
        });
        socketRef.current.on('start-game-engine', (game) => {
          setMatchState(game);
          socketRef.current.disconnect();
        });
        return history.push(`/newgame/${data.match}`);
      }
    } catch (error) {
      throw error;
    }
  };

  const joinGame = () => {
    return history.push('/join');
  };

  const instructions = () => {
    return history.push('/instructions');
  };

  return (
    <div className={classes.container}>
      <img src="https://res.cloudinary.com/du081ilw3/image/upload/v1620276073/Assets/cluewords_uief0a.png" alt="logo" className={classes.logo} />
      <Typography color="textPrimary" className={classes.header}>
        Welcome
            </Typography>
      <hr className={classes.hr} />
      <div className={classes.center}>
        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={newGame}
            className={classes.button}
          >
            New Game
                    </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={joinGame}
            className={classes.button}
          >
            Join Game
                    </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={instructions}
            className={classes.button}
          >
            How To Play
                    </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
