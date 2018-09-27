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
            delay: 400,
            timeout: 10000,
        }),
    },
    {
        path: '/register',
        exact: true,
        component: Loadable({
            loader: () => import('./register/Register'),
            loading: LoadingComponent,
            delay: 400,
            timeout: 10000,
        }),
    },
]