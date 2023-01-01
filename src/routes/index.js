import { Navigate } from 'react-router-dom';
import List from '@/pages/list';
import ReadingDetail from '@/pages/reading-detail';
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
    path: '/reading-detail',
    element: <ReadingDetail />,
  },
  {
    path: '/',
    element: <Navigate to='/main' />,
  },
];
