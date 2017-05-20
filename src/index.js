import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import App from './App'
import Translate from './pages/Translate'
import Dictionaries from './pages/Dictionaries'
import Dictionary from './pages/Dictionary'

import configureStore from './utils/store'

import './index.less'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

const NotFound = React.createClass({
    render() {
        return <h2>Not found</h2>
    }
})

ReactDOM.render((
    <Provider store={store} >
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Translate} />
                <Route path="/translate" component={Translate} />
                <Route path="dictionaries" component={Dictionaries} />
                <Route path="dictionaries/:dictionary" component={Dictionary} />
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'))
