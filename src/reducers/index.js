import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form';
import translateReducer from './translateReducer'
import dictionaryReducer from './dictionaryReducer'

export default combineReducers({
    routing,
    form,
    translate: translateReducer,
    dictionary: dictionaryReducer,
})
