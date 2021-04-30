import {
  TextField,
  Button,
  Typography,
  Link,
  Paper,
  Grid,
  Box,
  makeStyles,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../ContextProvider/actions';
import { useUserDispatch, useUserState } from '../ContextProvider/user';

const useStyles = makeStyles({
  textField: {
    width: '50%',
  },
  bold: {
    color: 'black',
  },
  seperator: {
    width: '10%',
    border: '1px solid #00e676',
  },
  formPadding: {
    padding: '20px',
  },
});

const initialLogInData = {
  signInEmail: '',
  signInPassword: '',
};


const LogIn = () => {
  //state declaration
  const [logInData, setLogInData] = useState(initialLogInData);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { error, isLoggedIn } = useUserState();
  const dispatch = useUserDispatch();

  const classes = useStyles();
  const history = useHistory();

   useEffect(() => {
    if (isLoggedIn) {
      return history.push('/home');
    }
  }, [isLoggedIn, history]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setLogInData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(dispatch, logInData);
      if (response) {
        //change this to direct user to a different page
        return history.push('/home');
      }
    } catch (err) {
      setSnackbarOpen(true);
    }
  };

  return (
    <Grid container>
      <Grid item xs></Grid>
      <Grid item xs={8} sm={6} md={4} p={2}>
        <Box pt={4} textAlign="center">
          <Paper elevation={3}>
            <form onSubmit={handleSubmit} className={classes.formPadding}>
              <Box>
                <Typography variant="h4">
                  <legend>Sign In</legend>

                  <hr className={classes.seperator} />
                </Typography>
              </Box>
              <Box mt={4}>
                <Box>
                  <TextField
                    variant="outlined"
                    className={classes.textField}
                    margin="normal"
                    required
                    id="email"
                    value={logInData.signInEmail}
                    label="Email Address"
                    name="signInEmail"
                    type="email"
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    className={classes.textField}
                    id="password"
                    value={logInData.signInPassword}
                    label="Password"
                    name="signInPassword"
                    type="password"
                    onChange={handleChange}
                  />
                </Box>
              </Box>
              <Box p={2.5} m={1}>
                <Button variant="contained" color="secondary" type="Submit">
                  Sign In
                </Button>
              </Box>
              <Box>
                <Typography>
                  <Link href="/signup" variant="body2" color="textSecondary">
                    Don't have an account?{" "}
                    <strong className={classes.bold}>Sign up?</strong>
                  </Link>
                </Typography>
              </Box>
            </form>
          </Paper>
          <Snackbar open={snackbarOpen}>
            <Alert onClose={() => setSnackbarOpen(false)} severity="error">
              {error}
            </Alert>
          </Snackbar>
        </Box>
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  );
};

export default LogIn;
