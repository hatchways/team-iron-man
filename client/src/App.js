import React, { useState } from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';

import { theme } from './themes/theme';
import LandingPage from './pages/Landing';
import Navigation from './components/Navigation';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import NewGame from "./pages/NewGame";
import './App.css';
import AssignRoles from './pages/AssignRoles';

function App() {
  //this is placeholder for now. To be moved to ContextProvider
  const [isLoggedIn, setStatus] = useState(false);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation toggleNav={isLoggedIn} />
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={(props) => <LandingPage status={isLoggedIn} />}
        />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route path="/assignroles" component={AssignRoles} />
        <Route path="/newgame" component={NewGame} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
