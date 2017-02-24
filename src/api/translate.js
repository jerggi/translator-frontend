import fetch from '../utils/fetch'
import { isEmpty } from 'lodash';

export function translate(word, dicts) {
    const params = { word };

    if (!isEmpty(dicts)) {
        params['dicts'] = dicts;
    }

    return fetch('/api/translate', {
        method: 'GET',
        params
    });
}

export function getDictList() {
    return fetch('/api/dictionary', {
        method: 'GET'
    });
}
