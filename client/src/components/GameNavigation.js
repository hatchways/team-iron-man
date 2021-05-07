import React, { useState, useContext } from 'react';
import {
  Typography,
  Toolbar,
  makeStyles,
  Grid,
  Button,
  Avatar,
  Menu,
  MenuItem,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { MatchContext } from '../ContextProvider/match';
import { useHistory } from 'react-router';
import { useUserState } from '../ContextProvider/user';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'white',
    color: 'black',
    height: '10vh',
    width: '100%',
  },

  block: {
    display: 'block',
  },

  left: {
    display: 'flex',
    alignItems: 'center',
  },

  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  right: {
    color: 'blue',
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  newGameButton: {
    marginRight: '10px',
    color: 'white',
    backgroundColor: '#00e676',
    '&:hover': {
      backgroundColor: '#76ff03',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 'x-small',
      padding: '6px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 'x-small',
      padding: '2px',
    },
  },
  menuItem: {
    '&:hover': {
      backgroundColor: 'lightgray',
    },
  },
  blue: {
    color: '#2196f3',
  },
  red: {
    color: '#ff5e62',
  },
  white: {
    color: 'white',
  },
  scoreSpacing: {
    margin: '0 10px 20px 10px',
    [theme.breakpoints.down('xs')]: {
      fontSize: 'large',
    },
  },
  title: {
    fontWeight: '500',
    fontSize: 'large',
    transition: 'font-size 0.2s ease-in',
    '&:hover': {
      fontWeight: '300',
      fontSize: '20px',
      cursor: 'pointer',
      transition: 'font-size 0.2s ease-in;',
    },
  },
  points: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 'large',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 'small',
    },
  },
  teams: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 'small',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 'x-small',
    },
  },
  decrease: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 'x-small',
    },
  },
}));

const GameNavigation = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, avatar } = useUserState();
  const history = useHistory();
  const { matchState, setMatchState } = useContext(MatchContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToProfile = () => {
    handleClose();
    setMatchState(null);
    return history.push('/profile');
  };

  const goHome = () => {
    setMatchState(null);
    history.push('/home');
  };

  return (
    <Toolbar className={classes.root}>
      <Grid container>
        <Grid item xs={4} className={classes.left}>
          <Typography className={classes.title} onClick={() => goHome()}>
            CLUE: {matchState.clue}
          </Typography>
        </Grid>
        <Grid item xs={4} className={classes.center}>
          <ArrowRightIcon
            className={
              matchState.turn === 'blue' ? classes.blue : classes.white
            }
            fontSize="large"
          />
          <div className={classes.blue}>
            <Typography className={classes.points} variant="h3" align="center">
              {matchState.bluePoints}
            </Typography>
            <Typography className={classes.teams} variant="h6" align="center">
              Blue Team
            </Typography>
          </div>
          <Typography variant="h2" className={classes.scoreSpacing}>
            -
          </Typography>
          <div className={classes.red}>
            <Typography className={classes.points} variant="h3" align="center">
              {matchState.redPoints}
            </Typography>
            <Typography className={classes.teams} variant="h6" align="center">
              Red Team
            </Typography>
          </div>
          <ArrowLeftIcon
            className={matchState.turn === 'red' ? classes.red : classes.white}
            fontSize="large"
          />
        </Grid>
        <Grid item xs={4} className={classes.right}>
          <Button
            variant="contained"
            className={classes.newGameButton}
            onClick={() => console.log(user)}
          >
            New Game
          </Button>
          <Avatar alt="avatar" src={avatar} />
          <Button
            className={classes.decrease}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            My Profile
            <ArrowDropDownIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <MenuItem onClick={goToProfile} className={classes.menuItem}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose} className={classes.menuItem}>
              Logout
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default GameNavigation;
