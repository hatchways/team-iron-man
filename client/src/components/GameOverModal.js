import React, {  useContext,  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Typography, Box } from '@material-ui/core/';
import { MatchContext } from '../ContextProvider/match';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  modal: {
    width: '20%',
    height: '30%',
    margin: 'auto',
    backgroundColor: '#2196f3',
    boxShadow:
      '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderRadius: '10px',
  },
  container: {
    display: 'flex',
    margin: 'auto',
    justifyContent: 'center',
    borderRadius: '10px',
    textAlign: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    padding: '50px',
    flexDirection: 'column',
  },
  header: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    marginBottom: '20px',
  },
  button: {
    marginLeft: '10px',
  },
  blue: {
    color: '#2196f3',
  },
  red: {
    color: '#ff5e62',
  },
});

const GameOverModal = ({ open }) => {
  const classes = useStyles();
  const { matchState } = useContext(MatchContext);
  const history = useHistory();

  const handleClose = () => {
    return history.push('/');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      disableBackdropClick
      disableEscapeKeyDown
    >
      <Box
        className={classes.container}
        style={{
          backgroundColor: `${
            matchState.winner === 'red' ? 'Tomato' : 'PowderBlue'
          }`,
        }}
      >
        <Box className={classes.center}>
          <Typography variant="h5" className={classes.header}>
            GAME OVER
          </Typography>
          <Typography
            variant="h6"
            className={classes.header}
          >{`${matchState.winner.toUpperCase()} TEAM WINS!!!`}</Typography>
          <Typography
            variant="h6"
            className={classes.header}
          >{`SCORE: BLUE ${matchState.bluePoints} - RED ${matchState.redPoints}`}</Typography>
          <Button
            className={classes.button}
            onClick={handleClose}
            color="secondary"
            variant="contained"
          >
            New Game
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default GameOverModal;
