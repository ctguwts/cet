import { Navigate, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// const List = lazy(() => import(/* webpackChunkName: "list", webpackPrefetch: true */ '@/pages/list'));
// const ReadingDetail = lazy(() => import(/* webpackChunkName: "reading-detail", webpackPrefetch: true */ '@/pages/reading-detail'));
// const VocabularyComprehension = lazy(() =>
//   import(/* webpackChunkName: "vocabulary-comprehension", webpackPrefetch: true */ '@/pages/vocabulary-comprehension'),
// );
// const LongReading = lazy(() => import(/* webpackChunkName: "long-reading", webpackPrefetch: true */ '@/pages/long-reading'));
// const LongConservation = lazy(() => import(/* webpackChunkName: "long-conversation", webpackPrefetch: true */ '@/pages/long-conversation'));
// const LoginPage = lazy(() => import(/* webpackChunkName: "log-in", webpackPrefetch: true */ '@/pages/log-in'));
// const Text = lazy(() => import(/* webpackChunkName: "text", webpackPrefetch: true */ '@/pages/text'));
// const Main = lazy(() => import('@/pages/main'));

const List = lazy(() => import(/* webpackChunkName: "list" */ '@/pages/list'));
const ReadingDetail = lazy(() => import(/* webpackChunkName: "reading-detail" */ '@/pages/reading-detail'));
const VocabularyComprehension = lazy(() => import(/* webpackChunkName: "vocabulary-comprehension" */ '@/pages/vocabulary-comprehension'));
const LongReading = lazy(() => import(/* webpackChunkName: "long-reading" */ '@/pages/long-reading'));
const LongConservation = lazy(() => import(/* webpackChunkName: "long-conversation" */ '@/pages/long-conversation'));
const LoginPage = lazy(() => import(/* webpackChunkName: "log-in" */ '@/pages/log-in'));
const Text = lazy(() => import(/* webpackChunkName: "text" */ '@/pages/text'));
const Main = lazy(() => import('@/pages/main'));

export default [
  {
    path: '/main',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: '/list',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <List />
      </Suspense>
    ),
  },
  {
    path: '/reading-detail',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ReadingDetail />
      </Suspense>
    ),
  },
  {
    path: '/vocabulary-comprehension',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <VocabularyComprehension />
      </Suspense>
    ),
  },
  {
    path: '/long-reading',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LongReading />
      </Suspense>
    ),
  },
  {
    path: '/long-conversation',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LongConservation />
      </Suspense>
    ),
  },
  {
    path: '/',
    element: <Navigate to='/main' />,
  },
  {
    path: 'log-in',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: '/text',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Text />
      </Suspense>
    ),
  },
];

// import { Navigate } from 'react-router-dom';
// import List from '@/pages/list';
// import ReadingDetail from '@/pages/reading-detail';
// import VocabularyComprehension from '@/pages/vocabulary-comprehension';
// import LongReading from '@/pages/long-reading';
// import LongConservation from '@/pages/long-conversation';
// import LoginPage from '@/pages/log-in';
// import Text from '@/pages/text';
// import Main from '@/pages/main';

// export default [
//   {
//     path: '/main',
//     element: <Main />,
//   },
//   {
//     path: '/list',
//     element: <List />,
//   },
//   {
//     path: '/reading-detail',
//     element: <ReadingDetail />,
//   },
//   {
//     path: '/vocabulary-comprehension',
//     element: <VocabularyComprehension />,
//   },
//   {
//     path: '/long-reading',
//     element: <LongReading />,
//   },
//   {
//     path: '/long-conversation',
//     element: <LongConservation />,
//   },
//   {
//     path: '/',
//     element: <Navigate to='/main' />,
//   },
//   {
//     path: 'log-in',
//     element: <LoginPage />,
//   },
//   {
//     path: '/text',
//     element: <Text />,
//   },
// ];
