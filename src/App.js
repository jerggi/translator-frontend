import React from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TextField from 'material-ui/TextField';
import Navbar from './components/Navbar.js';

import { muiTheme } from './_muiTheme';

class App extends React.Component {
    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                        <Navbar title="Translate" />
                        {this.props.children}
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
