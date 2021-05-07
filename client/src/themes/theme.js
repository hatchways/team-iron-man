import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"KGHAPPY"',
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
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage:
            "url(https://res.cloudinary.com/du081ilw3/image/upload/v1620216354/Assets/1027_jgggty.png)"
        }
      }
    }
  }
});
