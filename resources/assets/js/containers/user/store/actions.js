
import {
    USER_UPDATE,
    USER_UNSET,
} from './action-types';

export function userUpdate(payload) {
    return {
        type: USER_UPDATE,
        payload,
    };
}

export function unsetUser() {
    return {
        type: USER_UNSET,
    }
}