import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import NewGame from "./pages/NewGame";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" component={LandingPage} />
        <Route path="/newgame" component={NewGame} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
