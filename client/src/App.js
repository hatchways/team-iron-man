import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";

import "./App.css";

function App() {
	//use setNav to toggle a differnt Navigation bar
	const [toggleNav, setNav] = useState(false);

  return (
    <MuiThemeProvider theme={theme}>
     <Navigation toggleNav={toggleNav}/>
      <BrowserRouter>
        <Route path="/" component={LandingPage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
