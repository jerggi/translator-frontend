import fetch from '../utils/fetch'

export function getDictionaries(params = {}) {
    return fetch('/api/dictionary', {
        method: 'GET',
        params,
    })
}

export function getDictionary(name, params) {
    return fetch(`/api/dictionary/${encodeURIComponent(name)}`, {
        method: 'GET',
        params,
    })
}

export function createDictionary(name) {
    return fetch('/api/dictionary', {
        method: 'POST',
        body: JSON.stringify({
            name,
        }),
    })
}

// change name to id
export function deleteDictionary(name) {
    return fetch(`/api/dictionary/${encodeURIComponent(name)}`, {
        method: 'DELETE'
    })
}
