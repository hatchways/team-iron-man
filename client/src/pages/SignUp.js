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
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { registerUser } from '../ContextProvider/actions';
import { useUserDispatch, useUserState } from '../ContextProvider/user';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '50%',
    [theme.breakpoints.down('lg')]: {
      width: '70%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  black: {
    color: 'black',
  },
  seperator: {
    width: '10%',
    border: '1px solid #00e676',
  },
  formPadding: {
    padding: '20px',
  },
}));

const initialFormData = {
  registerEmail: '',
  registerName: '',
  registerPassword: '',
  confirmPassword: '',
};

const initialValData = {
  lengthValidation: true,
  confirmValidation: true,
};

const SignUp = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [valData, setValData] = useState(initialValData);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { error, isLoggedIn } = useUserState();
  const dispatch = useUserDispatch();

  const classes = useStyles();
  const history = useHistory();
  //change this to change the min length requirement
  const minLength = 6;
  const handleValidation = useCallback(() => {
    setValData((prevState) => ({
      ...prevState,
      lengthValidation:
        formData.registerPassword.length >= minLength ||
        formData.registerPassword.length === 0,
      confirmValidation: formData.registerPassword === formData.confirmPassword,
    }));
  }, [formData.registerPassword, formData.confirmPassword]);

  useEffect(() => {
    handleValidation();
  }, [formData, handleValidation]);

  useEffect(() => {
    if (isLoggedIn) {
      return history.push('/home');
    }
  }, [isLoggedIn, history]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await registerUser(dispatch, formData);
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
                  Sign Up
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
                    id="name"
                    value={formData.registerName}
                    label="Full Name"
                    name="registerName"
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <TextField
                    variant="outlined"
                    className={classes.textField}
                    margin="normal"
                    required
                    id="email"
                    value={formData.registerEmail}
                    label="Email Address"
                    name="registerEmail"
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
                    value={formData.registerPassword}
                    label="Password"
                    name="registerPassword"
                    error={!valData.lengthValidation}
                    helperText={
                      !valData.lengthValidation
                        ? `Password must be equal to or greater than ${minLength} characters`
                        : false
                    }
                    type="password"
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    className={classes.textField}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    label="Confirm Password"
                    name="confirmPassword"
                    error={!valData.confirmValidation}
                    helperText={
                      !valData.confirmValidation
                        ? 'Confirm Password should match Password'
                        : false
                    }
                    type="password"
                    onChange={handleChange}
                  />
                </Box>
              </Box>
              <Box p={2.5} m={1}>
                <Button variant="contained" color="secondary" type="Submit">
                  Sign Up
                </Button>
              </Box>
              <Box>
                <Typography>
                  <Link href="/login" variant="body2" color="textSecondary">
                    Already have an account?{' '}
                    <span className={classes.black}>Sign in?</span>
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

export default SignUp;
