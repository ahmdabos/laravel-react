// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../../components/loader/Loader'

const routes = [
    {
        path: '/',
        exact: true,
        component: Loadable({
            loader: () => import('./list/Articles'),
            loading: LoadingComponent,
        }),
    },
    {
        path: '/blog',
        exact: true,
        component: Loadable({
            loader: () => import('./list/Articles'),
            loading: LoadingComponent,
        }),
    },
    {
        path: '/blog/:slug',
        exact: true,
        component: Loadable({
            loader: () => import('./details/Article'),
            loading: LoadingComponent,
        }),
    },
]

export default routes
