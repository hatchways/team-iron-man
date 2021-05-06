import React, { useState, useContext } from 'react';
import { Box, Toolbar, makeStyles, Grid, Button, Avatar, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { MatchContext } from '../ContextProvider/match';
import { useUserState } from "../ContextProvider/user";
import { useHistory } from 'react-router';
import GameNavigation from './GameNavigation';
import BouncingText from 'react-bouncing-text';

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
    white: {
        color: 'white',
        WebkitTextStroke: '0.2px black'
    },
    scoreSpacing: {
        margin: "0 10px 20px 10px"
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
    }
});

const AuthNavigation = () => {
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
        return history.push("/profile");
    }

    const goHome = () => {
        setMatchState(null);
        history.push("/home");
    }

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
                                <MenuItem onClick={handleClose} className={classes.menuItem}>Logout</MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Toolbar>
            }
        </React.Fragment>

    );
};

export default AuthNavigation;