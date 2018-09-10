// import lib
import Loadable from 'react-loadable';

// import components
import LoadingComponent from '../../components/loader/Loader';


export default [
    {
        path: '/login',
        exact: true,
        component: Loadable({
            loader: () => import('./login/Login'),
            loading: LoadingComponent,
        }),
    },
    {
        path: '/register',
        exact: true,
        component: Loadable({
            loader: () => import('./register/Register'),
            loading: LoadingComponent,
        }),
    },
]