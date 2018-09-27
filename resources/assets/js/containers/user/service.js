import {notify} from 'react-notify-toast';
import Http from '../../utils/Http'
import Transformer from '../../utils/Transformer'
import * as userActions from './store/actions'

export function userUpdateRequest(params) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.patch(`/users/${params.id}`, Transformer.send(params))
                .then(res => {
                    notify.show("Profile updated successfully", "success", 2000);
                    dispatch(userActions.userUpdate(Transformer.fetch(res.data.user)))
                    return resolve()
                })
                .catch((err) => {
                    notify.show("Something went wrong, Please try again later", "error", 2000);
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
                    return reject(data);
                })
        })
    )
}
