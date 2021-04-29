import React, { useState } from 'react';
import { AppBar, Typography, Toolbar, makeStyles, Grid, Button, Avatar, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useUserState } from "../ContextProvider/user";
import { useHistory } from 'react-router';

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
    }
});

//
const AuthNavigation = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const { user, avatar } = useUserState();
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

    return (
        <Toolbar className={classes.root}>
            <Grid container>
                <Grid item xs={6} className={classes.left}>
                    <Typography variant="h6">C L U E W O R D S</Typography>
                </Grid>
                <Grid item xs={6} className={classes.right}>
                    <Button variant="contained" className={classes.newGameButton}>New Game</Button>
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
    );
};

export default AuthNavigation;