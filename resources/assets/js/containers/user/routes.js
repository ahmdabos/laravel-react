// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../components/loader/Loader'

export default [
  {
    path: '/users/:id/edit',
    exact: true,
    auth: true,
    component: Loadable({
      loader: () => import('./edit/Edit'),
      loading: LoadingComponent,
    }),
  },
]