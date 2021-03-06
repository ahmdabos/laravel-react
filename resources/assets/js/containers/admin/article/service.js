import Http from '../../../utils/Http'
import Transformer from '../../../utils/Transformer'
import * as articleActions from './store/actions'
import {notify} from 'react-notify-toast';

function transformRequest(parms) {
    return Transformer.send(parms)
}

function transformResponse(params) {
    return Transformer.fetch(params)
}

export function articleAddRequest(params) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('/articles', transformRequest(params))
                .then(res => {
                    dispatch(articleActions.add(transformResponse(res.data)))
                    notify.show("Article added successfully", "success", 5000, '');
                    return resolve()
                })
                .catch((err) => {
                    const statusCode = err.response.status;
                    const data = {
                        error: null,
                        statusCode,
                    };

                    if (statusCode === 422) {
                        const resetErrors = {
                            errors: err.response.data,
                            replace: false,
                            searchStr: '',
                            replaceStr: '',
                        };
                        data.error = Transformer.resetValidationFields(resetErrors);

                    } else if (statusCode === 401) {
                        data.error = err.response.data.message;
                    }
                    notify.show('Failed to add article', 'error', 5000, '');
                    return reject(data);
                })
        })
    )
}

export function articleEditRequest(id) {
    return dispatch => {
        Http.get(`articles/${id}`)
            .then((res) => {
                dispatch(articleActions.add(transformResponse(res.data)))

            })
            .catch((err) => {
                notify.show('Failed to edit article', 'error', 5000, '');
            })
    }
}

export function articleUpdateRequest(params) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.patch(`articles/${params.id}`, transformRequest(params))
                .then(res => {
                    dispatch(articleActions.add(transformResponse(res.data)))
                    notify.show("Article updated successfully", "success", 5000, '');
                    return resolve()
                })
                .catch((err) => {
                    const statusCode = err.response.status;

                    const data = {
                        error: null,
                        statusCode,
                    };

                    if (statusCode === 422) {
                        const resetErrors = {
                            errors: err.response.data,
                            replace: false,
                            searchStr: '',
                            replaceStr: '',
                        };
                        data.error = Transformer.resetValidationFields(resetErrors);
                    } else if (statusCode === 401) {
                        data.error = err.response.data.message;
                    }
                    notify.show('Failed to update article', 'error', 5000, '');
                    return reject(data);
                })
        })
    )
}

export function articleRemoveRequest(id) {
    return dispatch => {
        Http.delete(`articles/${id}`)
            .then(() => {
                dispatch(articleActions.remove(id))
                notify.show("Article removed successfully", "success", 5000, '');
            })
            .catch((err) => {
                notify.show('Failed to remove article', 'error', 5000, '');
            })
    }
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


