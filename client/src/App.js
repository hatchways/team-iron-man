import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";

import "./App.css";
import AssignRoles from './pages/AssignRoles';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter className="App">
          <Route path="/assignroles" component={AssignRoles} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
