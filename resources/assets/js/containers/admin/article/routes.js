// import lib
import Loadable from 'react-loadable';

// import components
import LoadingComponent from '../../../components/loader/Loader';

export default [
    {
        path: '/articles',
        exact: true,
        auth: true,
        component: Loadable({
            loader: () => import('./list/Articles'),
            loading: LoadingComponent,
            delay: 400,
            timeout: 10000,
        }),
    },
    {
        path: '/articles/create',
        exact: true,
        auth: true,
        component: Loadable({
            loader: () => import('./add/Add'),
            loading: LoadingComponent,
            delay: 400,
            timeout: 10000,
        }),
    },
    {
        path: '/articles/:id/edit',
        exact: true,
        auth: true,
        component: Loadable({
            loader: () => import('./edit/edit'),
            loading: LoadingComponent,
            delay: 400,
            timeout: 10000,
        }),
    },
]