import SORT_OPTIONS from '../utils/constants'
import * as actions from '../actions/constants'

const initialState = {
    translations: [],
}

const translationsReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.TRANSLATE:
            return {
                ...state,
                translations: action.payload.translations
            }
        default:
            return state
    }
}

export default translationsReducer
