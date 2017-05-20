import React from 'react'
import { Link, withRouter } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Col } from 'react-bootstrap'

import TextField from 'material-ui/TextField'
import Navbar from './components/Navbar.js'

import { muiTheme } from './_muiTheme'

class App extends React.Component {
  handlePageChange = (page) => {
    this.props.router.push(page)
  }

  render () {
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <Navbar title={this.props.router.location.pathname.includes('/dictionaries') ? 'Dictionaries' : 'Translate'} handlePageChange={this.handlePageChange} />
            <Col sm={10} smPush={1} xs={12}>
              {this.props.children}
            </Col>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default withRouter(App)
