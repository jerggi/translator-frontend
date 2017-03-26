import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux';
import translationsReducer from './translationsReducer'

export default combineReducers({
    routing,
    translations: translationsReducer
})
