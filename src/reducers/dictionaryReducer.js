import SORT_OPTIONS from '../utils/constants'
import * as Actions from '../actions/constants'

import { map, keys } from 'lodash'

const initialState = {
    dictionaries: [],
    dictionary: [],
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
                dictionary: map(keys(action.payload.dictionary), key => {
                    return {
                        word: key,
                        translations: action.payload.dictionary[key]
                    }
                })
            }
        default:
            return state
    }
}

export default dictionaryReducer
