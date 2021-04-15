import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";

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
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
