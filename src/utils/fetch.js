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


export default (url, { params, ...options } = {}) => {
    const queryString = serialize(params);
    const questionMark = isEmpty(queryString) ? '' : '?';
    let opts = options;

    const headers = options.headers || new Headers();
    opts = {
        ...options,
        headers,
    };

    return handleErrors(fetch(`${context}${url}${questionMark}${queryString}`, opts));
};
