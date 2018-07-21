import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import store from "./redux"
import AuthForm from './components/Auth/AuthForm'

import blueGrey from '@material-ui/core/colors/blueGrey'
import pink from '@material-ui/core/colors/pink'

import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: pink[400],
      main: pink[200],
      dark: pink[900],
      contrastText: '#fff',
    },
    secondary: {
      light: blueGrey[400],
      main: blueGrey[700],
      dark: blueGrey[900],
      contrastText: '#000',
    },
  }
  ,
  typography: {
    fontSize: 14,
    htmlFontSize: 10,
  }
})

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <AuthForm />
    </Provider>
  </MuiThemeProvider> , document.getElementById("auth")
)