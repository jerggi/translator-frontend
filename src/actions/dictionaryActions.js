import * as C from './constants'
import * as Api from '../api/translate'

export const getDictionaries = () => async dispatch => {
    try {
        const response = await Api.getDictionaries({ full: true })
        const dictionaries = await response.json()

        dispatch({
            type: C.GET_DICTIONARIES,
            payload: {
                dictionaries
            }
        })
    } catch (err) {
        console.error(err)
    }
}

export const getDictionary = (name) => async dispatch => {
    try {
        const response = await Api.getDictionary(name)
        const dictionary = await response.json()

        dispatch({
            type: C.GET_DICTIONARY,
            payload: {
                dictionary
            }
        })
    } catch (err) {
        console.error(err)
    }
}
