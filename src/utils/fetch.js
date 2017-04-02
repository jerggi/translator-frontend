import { isEmpty } from 'lodash';

const context = '';

export const serialize = (obj = {}) => Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');

const handleErrors = async response => {
    const r = await response;
    if (!r.ok) {
        throw new Error(r.status);
    }
    return response;
};

function getDefaultHeaders() {
    const headers = new Headers()

    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json')

    return headers
}

export default (url, { params, ...options } = {}) => {
    const queryString = serialize(params);
    const questionMark = isEmpty(queryString) ? '' : '?';
    let opts = options;

    const headers = options.headers || getDefaultHeaders();
    opts = {
        ...options,
        headers,
    };

    return handleErrors(fetch(`${context}${url}${questionMark}${queryString}`, opts));
};
