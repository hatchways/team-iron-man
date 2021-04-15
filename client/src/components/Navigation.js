import React from 'react';
import { AppBar, Typography, Toolbar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    background: 'white',
    color: 'black',
    alignItems: 'center'
  },
});

//
const Navigation = ({ toggleNav }) => {
  const classes = useStyles();
  return (
    <AppBar
      position="static"
      className={classes.root}
    >
      <Toolbar>
        {/* Additional features like profile icons can be added later */}
        <Typography variant="h6">C L U E W O R D S</Typography>
        {console.log("I shouldn't rerender")}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
