import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import {
  makeStyles,
  Box,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import ChatWindow from '../components/ChatWindow';
import { useUserState } from '../ContextProvider/user';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    margin: '30px',
    minheight: '10vh',
    maxWidth: '35vw',
    [theme.breakpoints.down('sm')]: {
      margin: '10px',
    },
  },
  button: {
    marginTop: '10px',
    marginLeft: '10px',
    padding: '10px',
    background: 'transparent',
    borderRadius: '5px',
  },
  window: {
    height: '60vh',
    maxHeight: '60vh',
    maxWidth: '20vw',
    [theme.breakpoints.down('lg')]: {
      height: '45vh',
    },
    [theme.breakpoints.down('md')]: {
      height: '35vh',
    },
    [theme.breakpoints.down('sm')]: {
      height: '40vh',
    },
  },
  message: {
    width: '75%',
    fontFamily: 'Roboto'
  },
  head: {
    fontWeight: '600',
    fontSize: '26px',
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px',
    },
  },
}));

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const { user } = useUserState();
  const { matchId } = useParams();
  const socketRef = useRef();
  const classes = useStyles();

  useEffect(() => {
    socketRef.current = io.connect('/');
    socketRef.current.emit('join-chat', { matchId });
    socketRef.current.on('message', ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat, matchId, user]);

  const onTextChange = (e) => {
    setMessage(e.target.value);
  };

  const onMessageSubmit = (e) => {
    socketRef.current.emit('message', { name: user, message, matchId });
    setMessage('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onMessageSubmit();
    }
  };

  return (
    <Box className={classes.card}>
      <Paper elevation={3}>
        <Box p={2}>
          <Typography className={classes.head}>
            Welcome to the Game Chat
          </Typography>
          <Box
            className={classes.window}
            border={1}
            borderColor="grey.500"
            overflow="auto"
          >
            <ChatWindow chat={chat} />
          </Box>
          <Box pt={2}>
            <TextField
              className={classes.message}
              name="message"
              onChange={onTextChange}
              value={message}
              id="outlined-multiline-static"
              variant="outlined"
              label="Message"
              onKeyDown={handleKeyDown}
            />
            <button className={classes.button} onClick={onMessageSubmit}>
              Send
            </button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Chat;
