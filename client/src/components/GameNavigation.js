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
  Box
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { MatchContext } from '../ContextProvider/match';
import { useHistory } from 'react-router';
import { useUserState, useUserDispatch } from '../ContextProvider/user';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { resetUser } from '../ContextProvider/actions';
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
    marginRight: '10px',
    display: 'none',
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
    display: 'flex',
    fontWeight: "500",
    fontSize: "x-large",
    color: '#00e676',
    WebkitTextStroke: '0.5px black',
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
  const dispatch = useUserDispatch();

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
          setMatchState(null);
          return history.push('/');
        }
      })
      .catch((err) => {
        console.log('Logout failed');
      });
  };

  return (
    <Toolbar className={classes.root}>
      <Grid container>
        <Grid item xs={4} className={classes.left}>
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
        <Grid item xs={4} className={classes.center}>
          <ArrowRightIcon className={matchState.turn === "blue" ? classes.blue : classes.white} fontSize="large" />
          <div className={classes.blue}>
            <Typography variant="h3" align="center" className={classes.points}>{matchState.bluePoints}</Typography>
            <Typography variant="h6" align="center" className={classes.teams}>Blue Team</Typography>
          </div>
          <Typography variant="h2" className={classes.scoreSpacing}>-</Typography>
          <div className={classes.red}>
            <Typography variant="h3" align="center" className={classes.points}>{matchState.redPoints}</Typography>
            <Typography variant="h6" align="center" className={classes.teams}>Red Team</Typography>
          </div>
          <ArrowLeftIcon className={matchState.turn === "red" ? classes.red : classes.white} fontSize="large" />
        </Grid>
        <Grid item xs={4} className={classes.right}>
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
            <MenuItem onClick={logout} className={classes.menuItem}>
              Logout
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default GameNavigation;
