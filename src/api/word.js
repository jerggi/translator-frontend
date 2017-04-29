import fetch from '../utils/fetch'

export function addWord(dict, word, translation) {
    return fetch(`/api/dictionary/${encodeURIComponent(dict)}/word`, {
        method: 'POST',
        body: JSON.stringify({
            word,
            translation,
        }),
    })
}

export function changeWord(dict, word, newWord, newTranslation) {
    return fetch(`/api/dictionary/${encodeURIComponent(dict)}/word`, {
        method: 'PUT',
        body: JSON.stringify({
            word,
            newWord,
            newTranslation,
        }),
    })
}

export function deleteWord(dict, word) {
    return fetch(`/api/dictionary/${encodeURIComponent(dict)}/word/${encodeURIComponent(word)}`, {
        method: 'DELETE',
    })
}
