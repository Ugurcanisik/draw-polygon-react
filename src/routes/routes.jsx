import { Navigate } from 'react-router-dom';
import Page from '../layouts/Page';
import Polygon from '@/pages/Polygon';
import PlaceCreate from '@/pages/Place/PlaceCreate';

const routes = [
  {
    path: '/',
    element: <Page />,
    children: [
      {
        path: '',
        element: <Navigate to='/polygons' />
      },
      {
        path: '/polygons',
        element: <Polygon />
      },
      {
        path: '/create-place',
        element: <PlaceCreate />
      },
      {
        path: '*',
        element: <Navigate to='/' />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
];

export default routes;
