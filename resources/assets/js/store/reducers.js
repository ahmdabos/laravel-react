import {combineReducers} from 'redux';

import auth from '../containers/auth/store/reduer';
import user from '../containers/user/store/reducer';
import articles from '../containers/article/store/reducer';

export default combineReducers({auth, user, articles});
