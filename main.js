import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import App from './src/App.jsx';

const Test = React.createClass({
    render() {
        return <h2>Test</h2>
    }
})

const NoMatch = React.createClass({
    render() {
        return <h2>No match</h2>
    }
})

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="test" component={Test}/>
            <Route path="*" component={NoMatch}/>
        </Route>
    </Router>
), document.getElementById('app'));
