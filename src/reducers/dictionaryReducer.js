import SORT_OPTIONS from '../utils/constants'
import * as Actions from '../actions/constants'

const initialState = {
    dictionaries: [],
    dictionary: {}
}

const dictionaryReducer = (state = initialState, action) => {
    switch(action.type) {
        case Actions.GET_DICTIONARIES:
            return {
                ...state,
                dictionaries: action.payload.dictionaries
            }
        case Actions.GET_DICTIONARY:
            return {
                ...state,
                dictionary: action.payload.dictionary
            }
        default:
            return state
    }
}

export default dictionaryReducer
