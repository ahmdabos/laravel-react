import Http from '../../../utils/Http'
import Transformer from '../../../utils/Transformer'
import * as articleActions from './store/actions'
import {notify} from 'react-notify-toast';


function transformResponse(params) {
    return Transformer.fetch(params)
}

export function articleListRequest({pageNumber = 1, url = '/articles'}) {
    return dispatch => {
        if (pageNumber > 1) {
            url = url + `?page=${pageNumber}`
        }

        Http.get(url)
            .then((res) => {
                dispatch(articleActions.list(transformResponse(res.data)))
            })
            .catch((err) => {
                notify.show('Failed to list article', 'error', 5000, '');
            })
    }
}

export function articleFetchRequest(slug) {

    return dispatch => {
        Http.get(`articles/published/${slug}`)
            .then((res) => {
                dispatch(articleActions.fetch(transformResponse(res)))
            })
            .catch((err) => {
                notify.show('Failed to list article', 'error', 5000, '');
            })
    }
}