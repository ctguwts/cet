import { Navigate } from 'react-router-dom';
import List from '@/pages/list';
import ReadingDetail from '@/pages/reading-detail';
import VocabularyComprehension from '@/pages/vocabulary-comprehension';
import LongReading from '@/pages/long-reading';
import LongConservation from '@/pages/long-conversation';
import Text from '@/pages/text';
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
    path: '/vocabulary-comprehension',
    element: <VocabularyComprehension />,
  },
  {
    path: '/long-reading',
    element: <LongReading />,
  },
  {
    path: '/long-conversation',
    element: <LongConservation />,
  },
  {
    path: '/',
    element: <Navigate to='/main' />,
  },
  {
    path: '/text',
    element: <Text />,
  },
];
