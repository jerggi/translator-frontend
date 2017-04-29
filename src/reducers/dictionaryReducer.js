import SORT_OPTIONS from '../utils/constants'
import * as Actions from '../actions/constants'

import { map, keys } from 'lodash'

const initialState = {
    dictionaries: [],
    dictionary: {
        name: '',
        words: [],
    },
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
                dictionary: {
                    name: action.payload.dictionary.name,
                    words: map(keys(action.payload.dictionary.words), key => {
                        return {
                            word: key,
                            translation: action.payload.dictionary.words[key]
                        }
                    })
                },
            }
        default:
            return state
    }
}

export default dictionaryReducer
