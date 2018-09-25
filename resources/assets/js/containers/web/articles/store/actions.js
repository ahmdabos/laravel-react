import {
    ARTICLE_FETCH,
    ARTICLE_LIST,
} from './action-types';

export function fetch(payload) {
    return {
        type: ARTICLE_FETCH,
        payload
    }
}

export function list(payload) {
    return {
        type: ARTICLE_LIST,
        payload
    }
}