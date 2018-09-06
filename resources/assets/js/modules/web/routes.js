// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../common/loader'

const routes = [
    {
        path: '/',
        exact: true,
        component: Loadable({
            loader: () => import('./articles/Articles'),
            loading: LoadingComponent,
        }),
    },
    {
        path: '/blog',
        exact: true,
        component: Loadable({
            loader: () => import('./articles/Articles'),
            loading: LoadingComponent,
        }),
    },
    {
        path: '/blog/:slug',
        exact: true,
        component: Loadable({
            loader: () => import('./articles/details/Article'),
            loading: LoadingComponent,
        }),
    },
]

export default routes
