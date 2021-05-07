import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core/';
import { MatchContext } from '../ContextProvider/match';
import { useUserState } from '../ContextProvider/user';
import ReactCardFlip from 'react-card-flip';

const useStyles = makeStyles((theme) => ({
  container: {
    border: '10px solid black',
  },
  box: {
    height: '13vh',
    width: '13vw',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    cursor: 'pointer',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '500',
    fontSize: 'x-large',
    [theme.breakpoints.down('sm')]: {
      fontSize: 'large',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 'x-small',
    },
  },
  blueRevealed: {
    background: 'linear-gradient(to right, #5B86E5, #36D1DC)',
  },
  redRevealed: {
    background: 'linear-gradient(to right, #ff5e62, #ff9966)',
  },
  blackRevealed: {
    background: 'linear-gradient(to left, #434343, #000000)',
  },
  whiteRevealed: {
    background: 'linear-gradient(to left, lightgray, #8e9eab)',
  },
  defaultHidden: {
    backgroundColor: 'white',
    color: 'gray',
  },
  blueText: {
    color: '#5B86E5 !important',
  },
  redText: {
    color: '#ff5e62 !important',
  },
  blackText: {
    color: 'black',
  },
  whiteTextRevealed: {
    color: 'white',
    WebkitTextStroke: '0.3px black'
  },
  borderGlow: {
    borderColor: '#9ecaed',
    boxShadow: '0 0 10px #9ecaed',
  },
}));

const Card = (props) => {
  const classes = useStyles();
  const { email } = useUserState();
  const { matchState } = useContext(MatchContext);

  return (
    <ReactCardFlip isFlipped={props.revealed} flipDirection="vertical">
      <Box
        className={
          (props.spyMaster ? classes[props.color + 'Text'] : '') +
          ' ' +
          classes['defaultHidden'] +
          ' ' +
          classes['box'] +
          ' ' +
          (props.selected ? classes['borderGlow'] : '')
        }
        onClick={
          matchState.turnPhase === 'guess' &&
            ((matchState.turn === 'blue' &&
              matchState.blueGuessers.findIndex(
                (player) => player.email === email
              ) !== -1) ||
              (matchState.turn === 'red' &&
                matchState.redGuessers.findIndex(
                  (player) => player.email === email
                ) !== -1)) &&
            !props.revealed
            ? () => props.handleVote(props.word, props.row, props.column)
            : () => console.log('Not your turn.')
        }
      >
        {props.word}
      </Box>
      <Box
        className={
          classes[props.color + 'Revealed'] +
          ' ' +
          classes['whiteTextRevealed'] +
          ' ' +
          classes['box'] +
          ' ' +
          (props.selected ? classes['borderGlow'] : '')
        }
      >
        {props.word}
      </Box>
    </ReactCardFlip>
  );
};

export default Card;
