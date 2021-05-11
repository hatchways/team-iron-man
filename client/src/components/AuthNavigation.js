import React, { useState, useContext } from 'react';
import { Box, Toolbar, makeStyles, Grid, Button, Avatar, Menu, MenuItem, Typography } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { MatchContext } from '../ContextProvider/match';
import { useUserState, useUserDispatch } from "../ContextProvider/user";
import { resetUser } from "../ContextProvider/actions";
import { useHistory } from 'react-router';
import GameNavigation from './GameNavigation';
import BouncingText from 'react-bouncing-text';

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
    display: 'none',
    marginRight: "10px",
    color: "white",
    backgroundColor: "#00e676",
    "&:hover": {
      backgroundColor: "#76ff03",
    }
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 'x-small',
    padding: '6px',
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
  white: {
    color: 'white',
    WebkitTextStroke: '0.2px black'
  },
  scoreSpacing: {
    margin: "0 10px 20px 10px"
  },
  title: {
    display: 'flex',
    fontSize: "x-large",
    color: '#00e676',
    WebkitTextStroke: '0.5px black',
    [theme.breakpoints.down('sm')]: {
      fontSize: 'large',
    },

  },
  logo: {
    width: '50px',
    marginRight: '10px'
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: "pointer",
    }
  },
  menuButton: {
    marginLeft: '5px',
    '&:hover': {
      backgroundColor: 'lightgray'
    }
  }
}));

const AuthNavigation = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, avatar } = useUserState();
  const dispatch = useUserDispatch();
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
    return history.push('/profile');
  };

  const goHome = () => {
    setMatchState(null);
    history.push('/home');
  };

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
        throw err;
      });
  };

  return (
    <React.Fragment>
      {matchState && matchState.inProgress ? <GameNavigation /> :
        <Toolbar className={classes.root}>
          <Grid container>
            <Grid item xs={6} className={classes.left}>
              <Box onClick={() => goHome()} className={classes.flex}>
                <img src="https://res.cloudinary.com/du081ilw3/image/upload/v1620276307/Assets/cluewords_textless_v6vy3n.png" alt="logo" className={classes.logo} />
                <BouncingText
                  text="CLUEWORDS"
                  hoverable
                  delay={30}
                  duration={200}
                  className={classes.title}
                  onClick={() => goHome()}
                />
              </Box>
            </Grid>
            <Grid item xs={6} className={classes.right}>
              <Button variant="contained" className={classes.newGameButton} onClick={() => console.log(user)}>New Game</Button>
              <Avatar alt="avatar" src={avatar} />
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.menuButton}>
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
                <MenuItem onClick={logout} className={classes.menuItem}>
                  Logout
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      }
    </React.Fragment>
  )
};

export default AuthNavigation;
