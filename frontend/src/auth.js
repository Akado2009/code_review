import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import store from "./store/index"
import AuthForm from './components/Auth/AuthForm'

import lightGreen from '@material-ui/core/colors/lightGreen'
import orange from '@material-ui/core/colors/orange'

import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: lightGreen[400],
      main: lightGreen[700],
      dark: lightGreen[900],
      contrastText: '#fff',
    },
    secondary: {
      light: orange[400],
      main: orange[700],
      dark: orange[900],
      contrastText: '#000',
    },
  }
  ,
  typography: {
    fontSize: 14,
    htmlFontSize: 10,
  }
});

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <AuthForm />
    </Provider>
  </MuiThemeProvider> , document.getElementById("auth")
)