import fetch from '../utils/fetch'

export function addWord(dict, word, translations) {
    return fetch('/api/dictionary/word', {
        method: 'POST',
        body: JSON.stringify({
            dict,
            word,
            translations,
        }),
    })
}

export function changeWord(dict, word, newWord, translation, newTranslation) {
    return fetch('/api/dictionary/word', {
        method: 'PUT',
        body: JSON.stringify({
            dict,
            word,
            newWord,
            translation,
            newTranslation
        }),
    })
}

export function deleteWord(dict, word, translation) {
    return fetch('/api/dictionary/word', {
        method: 'DELETE',
        body: JSON.stringify({
            dict,
            word,
            translation,
        }),
    })
}
