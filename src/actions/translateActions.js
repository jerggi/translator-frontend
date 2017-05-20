import * as C from './constants'
import * as Api from '../api/translate'
import { getDictionaries } from '../api/dictionary'

export const translate = (word, dicts) => async dispatch => {
    try {
        const response = await Api.translate(word, dicts)
        const translations = await response.json()

        dispatch({
            type: C.TRANSLATE,
            payload: {
                translations
            },
        })
    } catch (err) {
        console.error(err)
    }
}

export const getDictList = () => async dispatch => {
    try {
        const response = await getDictionaries()
        const dicts = await response.json()

        dispatch({
            type: C.GET_DICT_LIST,
            payload: {
                dicts
            }
        })

        return dicts
    } catch (err) {
        console.error(err)
    }
}
