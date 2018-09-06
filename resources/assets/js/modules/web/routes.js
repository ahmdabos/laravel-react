// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../common/loader'

const routes = [
    {
        path: '/',
        exact: true,
        component: Loadable({
            loader: () => import('./Articles'),
            loading: LoadingComponent,
        }),
    },
    {
        path: '/blog',
        exact: true,
        component: Loadable({
            loader: () => import('./Articles'),
            loading: LoadingComponent,
        }),
    },
    {
        path: '/blog/:slug',
        exact: true,
        component: Loadable({
            loader: () => import('./Article'),
            loading: LoadingComponent,
        }),
    },
]

export default routes
