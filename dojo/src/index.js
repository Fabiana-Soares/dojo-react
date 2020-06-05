import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider} from "@material-ui/core/styles";
import CssBaseLine from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  pallete:{
    primary: {
      main: "#FF2000"
    }
  },
  typography: {
    body2: {
      fontSize: 20
    }
  }
});


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseLine />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
