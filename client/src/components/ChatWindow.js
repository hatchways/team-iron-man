import React from 'react';
import { List, ListItem, Typography } from '@material-ui/core';
import { useUserState } from '../ContextProvider/user';

const ChatWindow = ({ chat }) => {
  const { user } = useUserState();

  return (
    <List component="nav">
      <ListItem>
        <Typography component="div">
          {chat.map(({ name, message }, index) => (
            <div key={index}>
              <h3
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
