import React from 'react';
import { AppBar, Typography, Toolbar, makeStyles } from '@material-ui/core';
import { useUserState } from "../ContextProvider/user";
import AuthNavigation from "./AuthNavigation";

const useStyles = makeStyles({
  root: {
    background: 'white',
    color: 'black',
    alignItems: 'center',
  },
});

//
const Navigation = () => {
  const classes = useStyles();
  const { user } = useUserState();
  return (
    <AppBar position="static" className={classes.root}>
      {user ? <AuthNavigation /> :
        <Toolbar>
          {/* Additional features like profile icons can be added later */}
          <Typography variant="h6">C L U E W O R D S</Typography>
        </Toolbar>}
    </AppBar>
  );
};

export default Navigation;
