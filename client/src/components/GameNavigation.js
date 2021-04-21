import React, { useState } from 'react';
import { AppBar, Typography, Toolbar, makeStyles, Grid, Button, Avatar, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles({
    root: {
        background: 'white',
        color: 'black',
        height: "10vh",
        justifyContent: "center",
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
        color: "#f50057"
    },

    scoreSpacing: {
        margin: "0 10px 20px 10px"
    }
});

//
const GameNavigation = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container>
                    <Grid item xs={4} className={classes.left}>
                        <Typography variant="h6">C L U E W O R D S</Typography>
                    </Grid>
                    <Grid item xs={4} className={classes.center}>
                        <div className={classes.blue}>
                            <Typography variant="h3" align="center">0</Typography>
                            <Typography variant="h6" align="center">Blue Team</Typography>
                        </div>
                        <Typography variant="h2" className={classes.scoreSpacing}>-</Typography>
                        <div className={classes.red}>
                            <Typography variant="h3" align="center">0</Typography>
                            <Typography variant="h6" align="center">Red Team</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={4} className={classes.right}>
                        <Button variant="contained" className={classes.newGameButton}>New Game</Button>
                        <Avatar alt="Some Dude" src="https://i.imgur.com/CLP18jh.png" />
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
                            <MenuItem onClick={handleClose} className={classes.menuItem}>Profile</MenuItem>
                            <MenuItem onClick={handleClose} className={classes.menuItem}>My account</MenuItem>
                            <MenuItem onClick={handleClose} className={classes.menuItem}>Logout</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default GameNavigation;