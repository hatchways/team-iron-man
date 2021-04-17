import React, { useState } from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import Navigation from './components/Navigation';
import NewGame from "./pages/NewGame";

import "./App.css";

function App() {
  //this is placeholder for now. To be moved to ContextProvider
  const [isLoggedIn, setStatus] = useState(false);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation toggleNav={isLoggedIn} />
      <BrowserRouter>
        <Route path="/newgame" component={NewGame} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;