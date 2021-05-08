import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import {
  makeStyles,
  Box,
  Paper,
  TextField,
  Typography,
  FormHelperText,
} from '@material-ui/core';
import ChatWindow from '../components/ChatWindow';
import { useUserState } from '../ContextProvider/user';
import { SocketContext } from '../ContextProvider/socket';

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
  roundedCorners: {
    borderRadius: '10px'
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
    fontSize: '26px',
    textAlign: 'center',
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
  const socket = useContext(SocketContext);
  const classes = useStyles();

  useEffect(() => {
    socket.emit('join-chat', { matchId });
    socket.on('message', ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socket.off('message');
  }, [socket, chat, matchId, user]);

  const onTextChange = (e) => {
    setMessage(e.target.value);
  };

  const onMessageSubmit = (e) => {
    socket.emit('message', { name: user, message, matchId });
    setMessage('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onMessageSubmit();
    }
  };

  return (
    <Box className={classes.card}>
      <Paper elevation={3} className={classes.roundedCorners}>
        <Box p={2}>
          <Typography className={classes.head}>
            Game Chat
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
