/*
UI for Game Board
*/
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from './Card';
import GameOverModal from './GameOverModal';
import { useParams } from 'react-router-dom';
import ClueModal from './ClueModal';
import { MatchContext } from '../ContextProvider/match';
import { useUserState } from '../ContextProvider/user';
import { SocketContext } from '../ContextProvider/socket';
import UserPrompt from './UserPrompt';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridColumnGap: '30px',
    alignItems: 'center',
    justifyContent: 'center',
    gridTemplateColumns: 'auto auto auto auto auto',
    [theme.breakpoints.down('sm')]: {
      gridColumnGap: '10px',
    },
    [theme.breakpoints.down('md')]: {
      gridColumnGap: '15px',
    },
  },
}));

export default function GameBoard() {
  const classes = useStyles();
  const { email } = useUserState();
  const socket = useContext(SocketContext);
  const { matchState, setMatchState } = useContext(MatchContext);
  const { matchIdParam } = useParams();
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (!matchState) {
      socket.emit("get-game-engine", { matchId: matchIdParam });
    }
    socket.on("update-game-engine-" + matchIdParam, (game) => {
      setMatchState(game);
      if (matchState && Object.keys(game.votes).length === 0) {
        setSelected({});
      }
    });
    return () => socket.off('update-game-engine-' + matchIdParam);
  }, [socket, matchIdParam, matchState, setMatchState]);

  const handleVote = (word, row, column) => {
    setSelected({ row, column });
    socket.emit("set-vote", { matchId: matchIdParam, word, row, column, email });
  };

  const submitClue = (clue, numOfGuesses) => {
    socket.emit("set-clue", { matchId: matchIdParam, clue, numOfGuesses });
    socket.on(`update-game-engine-${matchIdParam}`, (game) => {
      setMatchState(game);
    });
  };

  return (
    <div className={classes.root}>
      {matchState && (
        <div className={classes.container}>
          {matchState.board.map(function (row) {
            return row.map((card) => (
              <Card
                key={card.word}
                word={card.word}
                color={card.color}
                row={card.row}
                column={card.column}
                spyMaster={
                  email === matchState.redSpymaster.email ||
                  email === matchState.blueSpymaster.email
                }
                revealed={card.revealed}
                handleVote={handleVote}
                selected={
                  selected.row === card.row && selected.column === card.column
                }
              />
            ));
          })}
          <ClueModal
            open={
              matchState.turnPhase === 'clue' &&
              ((matchState.turn === 'blue' &&
                email === matchState.blueSpymaster.email) ||
                (matchState.turn === 'red' &&
                  email === matchState.redSpymaster.email))
            }
            submitClue={submitClue}
            cards={matchState.board}
          />
          <GameOverModal open={matchState.winner !== ''} />
          <UserPrompt />
        </div>
      )}
    </div>
  )
}