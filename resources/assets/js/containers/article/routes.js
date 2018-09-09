// import lib
import Loadable from 'react-loadable';

// import components
import LoadingComponent from '../../components/loader/Loader';

export default [
  {
    path: '/articles',
    exact: true,
    auth: true,
    component: Loadable({
      loader: () => import('./list/Articles'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/articles/create',
    exact: true,
    auth: true,
    component: Loadable({
      loader: () => import('./add/Add'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/articles/:id/edit',
    exact: true,
    auth: true,
    component: Loadable({
      loader: () => import('./edit'),
      loading: LoadingComponent,
    }),
  },
]