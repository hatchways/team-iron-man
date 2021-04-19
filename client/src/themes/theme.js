import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    },
  },
  palette: {
    background: {
      main: '#eeeeee',
    },
    primary: { main: '#DF1B1B' },
    secondary: { main: '#00e676' },
    textSecondary: { main: '#757575' },
  },
});
