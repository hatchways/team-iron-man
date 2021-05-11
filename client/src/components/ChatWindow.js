import React from 'react';
import { List, ListItem, Typography, makeStyles } from '@material-ui/core';
import { useUserState } from '../ContextProvider/user';

const useStyles = makeStyles((theme) => ({
  message: {
    fontFamily: 'Roboto',
    [theme.breakpoints.down('md')]: {
      fontSize: '12px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
}));

const ChatWindow = ({ chat }) => {
  const classes = useStyles();
  const { user } = useUserState();

  return (
    <List component="nav">
      <ListItem>
        <Typography component="div">
          {chat.map(({ name, message }, index) => (
            <div key={index}>
              <h3
                className={classes.message}
                style={{
                  color: `${name === user ? 'LightSalmon' : 'LightSlateGrey'}`,
                }}
              >
                {name}: <span style={{ color: 'black' }}>{message}</span>
              </h3>
            </div>
          ))}
        </Typography>
      </ListItem>
    </List>
  );
};

export default ChatWindow;
