import fetch from '../utils/fetch'

export function translate(word, dicts) {
    const params = { word }

    if (dicts.length > 0) {
        params.dict = dicts
    }

    return fetch('/api/translate', {
        method: 'GET',
        params,
    })
}
