import React, { useState } from 'react';
import { Typography, Toolbar, makeStyles, Grid, Button, Avatar, Menu, MenuItem, Snackbar } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Alert } from '@material-ui/lab';
import { useUserState } from "../ContextProvider/user";
import { useHistory } from 'react-router';
import { useUserDispatch } from '../ContextProvider/user';
import { resetUser } from '../ContextProvider/actions';

const useStyles = makeStyles({
    root: {
        background: 'white',
        color: 'black',
        height: "10vh",
        width: "100%"
    },

    block: {
        display: "block"
    },

    left: {
        display: "flex",
        alignItems: "center",
    },

    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    right: {
        color: "blue",
        textAlign: "right",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    newGameButton: {
        marginRight: "10px",
        color: "white",
        backgroundColor: "#00e676",
        "&:hover": {
            backgroundColor: "#76ff03",
        }
    },
    menuItem: {
        "&:hover": {
            backgroundColor: "lightgray"
        }
    },
    blue: {
        color: "#2196f3",
    },
    red: {
        color: "#ff5e62"
    },
    scoreSpacing: {
        margin: "0 10px 20px 10px"
    },
    title: {
        fontWeight: "500",
        fontSize: "large",
        transition: "font-size 0.2s ease-in",
        '&:hover': {
            fontWeight: "600",
            fontSize: "20px",
            cursor: "pointer",
            transition: "font-size 0.2s ease-in;"
        }
    }
});

const AuthNavigation = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const { user, avatar } = useUserState();
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const dispatch = useUserDispatch();
    const history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const goToProfile = () => {
        handleClose();
        return history.push("/profile");
    }

    const logout = () => {
        fetch('/api/logout', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }})
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

    return (
        <Toolbar className={classes.root}>
            <Grid container>
                <Grid item xs={6} className={classes.left}>
                    <Typography className={classes.title} onClick={() => history.push("/home")}>C L U E W O R D S</Typography>
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
            <Snackbar open={snackbarOpen}>
            <Alert onClose={() => setSnackbarOpen(false)} severity="error">
              Logout failed! Please try again.
            </Alert>
          </Snackbar>
        </Toolbar>
    );
};

export default AuthNavigation;
