import React, { useState, useMemo } from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { theme } from './themes/theme';
import LandingPage from './pages/Landing';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Join from './pages/Join';
import NewGame from './pages/NewGame';
import Chat from './pages/Chat';
import Lost from './pages/Lost';
import './App.css';
import AssignRoles from './pages/AssignRoles';
import GameLayout from './pages/GameLayout';
import { UserProvider } from './ContextProvider/user';
import { MatchContext } from './ContextProvider/match';
import GameBoard from './components/GameBoard';
import Profile from './pages/Profile';
import HowToPlay from './pages/HowToPlay';

function App() {

  const [matchState, setMatchState] = useState(null);

  const matchValue = useMemo(() => ({ matchState, setMatchState }), [matchState, setMatchState]);
  //Routes can be cleaned up using Switch
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <MatchContext.Provider value={matchValue}>
          <BrowserRouter>
            <Navigation />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <PrivateRoute exact path="/lobby/:matchIdParam" component={AssignRoles} />
            <Route path="/newgame/:matchIdParam" component={NewGame} />
            <Route path="/join/:matchIdParam?" component={Join} />
            <Route path="/chat" component={Chat} />
            <PrivateRoute path="/gamelayout/:matchIdParam" component={GameLayout} />
            <Route path="/board" component={GameBoard} />
            <Route path="/home" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route exact path="/instructions" component={HowToPlay} />
            <Route exact path="/lost" component={Lost} />
          </BrowserRouter>
        </MatchContext.Provider>
      </UserProvider>
    </MuiThemeProvider>
  );
}

export default App;
