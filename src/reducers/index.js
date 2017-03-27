import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import translateReducer from './translateReducer'
import dictionaryReducer from './dictionaryReducer'

export default combineReducers({
    routing,
    translate: translateReducer,
    dictionary: dictionaryReducer,
})
