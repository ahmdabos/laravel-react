import {
    ARTICLE_FETCH,
    ARTICLE_LIST,
} from './action-types'

const initialState = {
    currentPage: 0,
    data: [],
    from: 0,
    lastPage: 0,
    nextPageUrl: '',
    path: '',
    perPage: 0,
    prevPageUrl: null,
    to: 0,
    total: 0,
}

const reducer = (state = initialState, {type, payload = null}) => {

    switch (type) {
        case ARTICLE_FETCH:
            return fetch(state, payload)

        case ARTICLE_LIST:
            return list(state, payload)
        default:
            return state
    }
}

function fetch(state, payload) {
    state = {...state, ...payload}
    return state
}

function list(state, payload) {
    state = {...state, ...payload}
    return state
}

export default reducer
