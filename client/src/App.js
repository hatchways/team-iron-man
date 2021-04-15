import React, {useState} from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import Navigation from './components/Navigation';
import LogIn_SignUp from './pages/LogIn_SignUp.js';

import "./App.css";

function App() {
	//use setNav to toggle a differnt Navigation bar
	const [toggleNav, setNav] = useState(false);
	//use setStatus to redirect to a home route instead of signin if JWT is authenticated
	const [status, setStatus] = useState(false);

  return (
    <MuiThemeProvider theme={theme}>
     <Navigation toggleNav={toggleNav}/>
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={(props) => <LandingPage status={status} />}
        />
        <Route exact path="/login" component={LogIn_SignUp} />
        <Route exact path="/signup" component={LogIn_SignUp} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
