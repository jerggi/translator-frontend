import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import App from './App';
import Translate from './pages/translate';
import Dictionaries from './pages/dictionaries';

import './index.less';

const NotFound = React.createClass({
    render() {
        return <h2>Not found</h2>
    }
})

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Translate} />
            <Route path="dictionaries" component={Dictionaries}/>
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
), document.getElementById('app'));
