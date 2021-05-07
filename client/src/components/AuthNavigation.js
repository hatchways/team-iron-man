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
import { useUserState, useUserDispatch } from '../ContextProvider/user';
import { resetUser } from '../ContextProvider/actions';
import { useHistory } from 'react-router';
import GameNavigation from './GameNavigation';

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
  scoreSpacing: {
    margin: '0 10px 20px 10px',
  },
  title: {
    fontWeight: '500',
    fontSize: 'large',
    transition: 'font-size 0.2s ease-in',
    '&:hover': {
      fontWeight: '600',
      fontSize: '20px',
      cursor: 'pointer',
      transition: 'font-size 0.2s ease-in;',
    },
  },
}));

const AuthNavigation = () => {
<<<<<<< HEAD
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, avatar } = useUserState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useUserDispatch();
  const history = useHistory();
  const { matchState, setMatchState } = useContext(MatchContext);
=======
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const { user, avatar } = useUserState();
    const dispatch = useUserDispatch();
    const history = useHistory();
    const { matchState, setMatchState } = useContext(MatchContext);
>>>>>>> dev

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToProfile = () => {
    handleClose();
    return history.push('/profile');
  };

  const goHome = () => {
    setMatchState(null);
    history.push('/home');
  };

<<<<<<< HEAD
  const logout = () => {
    fetch('/api/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 202) {
          resetUser(dispatch);
          return history.push('/');
        }
      })
      .catch((err) => {
        setSnackbarOpen(true);
      });
  };
=======
    const logout = () => {
        fetch('/api/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                if (response.status === 202) {
                    resetUser(dispatch);
                    return history.push('/');
                }
            })
            .catch((err) => {
                console.log("Logout failed");
            });
    };

    return (
        <React.Fragment>
            {matchState && matchState.inProgress ? <GameNavigation /> :
                <Toolbar className={classes.root}>
                    <Grid container>
                        <Grid item xs={6} className={classes.left}>
                            <Typography className={classes.title} onClick={() => goHome()}>C L U E W O R D S</Typography>
                        </Grid>
                        <Grid item xs={6} className={classes.right}>
                            <Button variant="contained" className={classes.newGameButton} onClick={() => console.log(user)}>New Game</Button>
                            <Avatar alt="avatar" src={avatar} />
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                My Profile<ArrowDropDownIcon />
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
                                <MenuItem onClick={goToProfile} className={classes.menuItem}>Profile</MenuItem>
                                <MenuItem onClick={logout} className={classes.menuItem}>Logout</MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Toolbar>
            }
        </React.Fragment>
>>>>>>> dev

  return (
    <React.Fragment>
      {matchState && matchState.inProgress ? (
        <GameNavigation />
      ) : (
        <Toolbar className={classes.root}>
          <Grid container>
            <Grid item xs={6} className={classes.left}>
              <Typography className={classes.title} onClick={() => goHome()}>
                C L U E W O R D S
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.right}>
              <Button
                variant="contained"
                className={classes.newGameButton}
                onClick={() => console.log(user)}
              >
                New Game
              </Button>
              <Avatar alt="avatar" src={avatar} />
              <Button
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
      )}
    </React.Fragment>
  );
};

export default AuthNavigation;
