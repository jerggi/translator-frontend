import React from 'react'
import { Link, withRouter } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Col } from 'react-bootstrap'

import TextField from 'material-ui/TextField'
import Navbar from './components/Navbar.js'

import { muiTheme } from './_muiTheme'

const App = (props) => (
  <div>
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <Navbar title={props.router.location.pathname.includes('/dictionaries') ? 'Dictionaries' : 'Translate'} />
        <Col sm={10} smPush={1} xs={12}>
          {props.children}
        </Col>
      </div>
    </MuiThemeProvider>
  </div>
)

export default withRouter(App)
