import {combineReducers} from 'redux';
import web from '../containers/web/articles/store/reducer';
import auth from '../containers/auth/store/reduer';
import user from '../containers/user/store/reducer';
import articles from '../containers/admin/article/store/reducer';

export default combineReducers({web,auth, user, articles});
