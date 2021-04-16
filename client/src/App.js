import React, { useState } from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';

import { theme } from './themes/theme';
import LandingPage from './pages/Landing';
import Navigation from './components/Navigation';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import './App.css';

function App() {
  //use setNav to toggle a differnt Navigation bar
  const [toggleNav, setNav] = useState(false);
  //use setStatus to redirect to a home route instead of signin if JWT is authenticated
  const [status, setStatus] = useState(false);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation toggleNav={toggleNav} />
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={(props) => <LandingPage status={status} />}
        />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
