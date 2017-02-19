import React from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TextField from 'material-ui/TextField';

import { muiTheme } from './_muiTheme';

class App extends React.Component {
    componentWillMount() {
        var payload = {
            a: 1,
            b: 2
        };

        var data = new FormData();
        data.append( "json", JSON.stringify( payload ) );

        fetch("/api/users/",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify( payload ) 
        })
    }

    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                        <h4>Hello World!!!</h4>
                        <TextField
                            hintText="Password Field"
                            floatingLabelText="Password"
                        /><br />
                        <Link to="/test">Test</Link>

                        {this.props.children}
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
