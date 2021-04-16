import {
  TextField,
  Button,
  Typography,
  Link,
  makeStyles,
  Paper,
  Grid,
  Box,
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';

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

const Register = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [valData, setValData] = useState(initialValData);

  const classes = useStyles();
  //change this to change the min length requirement
  const minLength = 6;
  const handleValidation = useCallback(() => {
    setValData((prevState) => ({
      ...prevState,
      lengthValidation:
        formData.registerPassword.length >= minLength ||
        formData.registerPassword.length === 0,
    }));
    setValData((prevState) => ({
      ...prevState,
      confirmValidation: formData.registerPassword === formData.confirmPassword,
    }));
  }, [formData.registerPassword, formData.confirmPassword]);

  useEffect(() => {
    handleValidation();
  }, [formData, handleValidation]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData(initialFormData);
    setValData(initialValData);
  };

  return (
    <Grid container>
      <Grid item xs></Grid>
      <Grid item xs={8} sm={6} md={4}>
        <Box pt={4}>
          <Paper elevation={3}>
            <form onSubmit={handleSubmit} className={classes.formPadding}>
              <Box>
                <Typography variant="h4">
                  <legend>Sign Up</legend>
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
                  Sign In
                </Button>
              </Box>
              <Box>
                <Typography>
                  <Link href="/signin" variant="body2" color="textSecondary">
                    Already have an account?
                    <strong className={classes.bold}>Sign in?</strong>
                  </Link>
                </Typography>
              </Box>
            </form>
          </Paper>
        </Box>
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  );
};

export default Register;
