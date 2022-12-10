import { Navigate } from 'react-router-dom';
import List from '@/pages/list';
import Main from '@/pages/main';

export default [
  {
    path: '/main',
    element: <Main />,
  },
  {
    path: '/list',
    element: <List />,
  },
  {
    path: '/',
    element: <Navigate to='/main' />,
  },
];
