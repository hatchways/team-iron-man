/*
UI for Game Board
*/
import React, { useContext, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from './Card';
import GameOverModal from './GameOverModal';
import { useParams } from 'react-router-dom';
import ClueModal from './ClueModal';
import { MatchContext } from '../ContextProvider/match';
import { useUserState } from '../ContextProvider/user';
import io from 'socket.io-client';
import UserPrompt from './UserPrompt';

const useStyles = makeStyles({
  root: {
    width: '100%',
    border: '1px solid black',
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
  },
});

export default function GameBoard() {
  const classes = useStyles();
  const { email } = useUserState();
  const { matchState, setMatchState } = useContext(MatchContext);
  const socketRef = useRef();
  const { matchIdParam } = useParams();
  const [selected, setSelected] = useState({});

  useEffect(() => {
    socketRef.current = io.connect("/");
    if (!matchState) {
      socketRef.current.emit("get-game-engine", { matchId: matchIdParam });
    }
    socketRef.current.on("update-game-engine-" + matchIdParam, (game) => {
      setMatchState(game);
      if (matchState && matchState.votes === {}) {
        setSelected({});
      }
    });
    return () => socketRef.current.disconnect();
  }, []);

  const handleVote = (word, row, column) => {
    setSelected({ row, column });
    socketRef.current.emit("set-vote", { matchId: matchIdParam, word, row, column, email });
  };

  const submitClue = (clue, numOfGuesses) => {
    socketRef.current.emit("set-clue", { matchId: matchIdParam, clue, numOfGuesses });
    socketRef.current.on(`update-game-engine-${matchIdParam}`, (game) => {
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
          />
          <GameOverModal />
          <UserPrompt />
        </div>
      )}
    </div>
  );
}
