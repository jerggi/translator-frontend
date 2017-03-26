import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import reducers from '../reducers'

export default function configureStore(initialState = {}) {
    const reduxRouterMiddleware = routerMiddleware(browserHistory)

    let composeEnhancers = compose

    // && is development enviroment
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }

    const finalCreateStore = composeEnhancers(
        applyMiddleware(reduxRouterMiddleware)
    )(createStore)

    const store = finalCreateStore(reducers, initialState)

    return store
}
