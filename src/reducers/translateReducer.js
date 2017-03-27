import SORT_OPTIONS from '../utils/constants'
import * as actions from '../actions/constants'

const initialState = {
    translations: [],
    dicts: []
}

const translationsReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.TRANSLATE:
            return {
                ...state,
                translations: action.payload.translations
            }
        case actions.GET_DICT_LIST:
            return {
                ...state,
                dicts: action.payload.dicts
            }
        default:
            return state
    }
}

export default translationsReducer
