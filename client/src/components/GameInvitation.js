/*
Component for inviting friends to a new game.
*/

import React, { useState, useContext } from 'react';
import {
  Grid,
  Button,
  makeStyles,
  TextField,
  Typography,
  Snackbar,
  InputAdornment,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import { MatchContext } from '../ContextProvider/match';
import { useUserState } from '../ContextProvider/user';

const useStyles = makeStyles((theme) => ({
  block: {
    display: 'block',
  },

  form: {
    border: '1px solid lightgray',
    borderRadius: '3px',
    padding: '5px',
  },

  input: {
    border: 'none',
    width: '100%',
  },

  inputFocused: {
    outline: 'none',
    border: 'none',
  },

  invitation: {
    textAlign: 'left',
    fontStyle: 'italic',
    color: 'gray',
  },

  item: {
    marginTop: '50px',
    marginBottom: '50px',
    padding: '10px',
  },

  itemLeft: {
    textAlign: 'left',
    paddingRight: '80px',
    paddingLeft: '50px',
    borderRight: '1px solid lightgray',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '2px',
      paddingRight: '5px',
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: '40px',
      paddingRight: '25px',
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '2px',
      paddingRight: '5px',
    },
  },
  spacingTop: {
    marginTop: '2em',
    [theme.breakpoints.down('sm')]: {
      fontSize: 'x-small',
    },
  },
  submitButton: {
    width: '100px',
    [theme.breakpoints.down('xs')]: {
      width: '60px',
      fontSize: 'x-small',
    },
    [theme.breakpoints.down('sm')]: {
      width: '70px',
      fontSize: 'x-small',
    },
  },
  resize: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 'x-small',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
}));

function GameInvitation() {
  const classes = useStyles();

  const [emailInput, setEmailInput] = useState('');
  const [emailList, setEmailList] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { matchState } = useContext(MatchContext);
  const { user } = useUserState();

  const onInputChange = (e) => {
    setEmailInput(e.target.value);
  };

  const sendInvitation = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/match/invite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user,
          email: emailInput,
          matchID: matchState.matchId,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setEmailList([...emailList, emailInput]);
        setEmailInput('');
      } else {
        throw data.message;
      }
    } catch (error) {
      console.log(error);
      setSnackbarOpen(true);
    }
  };

  return (
    <Grid container alignItems="center">
      <Grid item xs={9}>
        <div className={classes.item + ' ' + classes.itemLeft}>
          <Typography>Invite friends via email:</Typography>
          <form onSubmit={sendInvitation}>
            <TextField
              value={emailInput}
              id="email-address"
              onChange={onInputChange}
              placeholder="Email address"
              className={classes.input}
              variant="outlined"
              type="email"
              InputProps={{
                classes: {
                  input: classes.resize,
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      type="submit"
                      className={classes.submitButton}
                    >
                      Send Invite
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </form>
          {emailList.length > 0 &&
            emailList.map((email) => (
              <Typography
                className={classes.invitation + ' ' + classes.block}
                key={email}
              >
                &#10004; {email + ' invited'}
              </Typography>
            ))}
        </div>
      </Grid>
      <Grid item xs={3}>
        <div className={classes.item + ' ' + classes.block}>
          <Typography>Or share link:</Typography>
          <Button
            variant="outlined"
            onClick={() => {
              navigator.clipboard.writeText(
                `localhost:3000/join/${matchState.matchId}`
              );
            }}
            className={classes.spacingTop}
            startIcon={<InsertLinkIcon />}
          >
            Copy
          </Button>
        </div>
      </Grid>
      <Snackbar open={snackbarOpen}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="error">
          An error was encountered while sending the invite. Please try again.
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default GameInvitation;
