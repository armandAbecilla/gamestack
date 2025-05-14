import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DefaultLayout from './components/Layout/DefaultLayout';
import HomePage from './pages/Home';
import SignupPage, { action as signUpAction } from './pages/Auth/Signup';
import LoginPage, { action as loginAction } from './pages/Auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AnonRoute from './components/auth/AnonRoute';
// import GameDetailPage from './pages/Game/GameDetail';

const GameDetailPage = lazy(() => import('./pages/Game/GameDetail'));
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Lazy loader, implemented this on top of the loader inside the component
import GameDetailsSkeleton from './components/skeleton-loaders/GameDetails';

// react query imports
import queryClient from './api/index';
import { QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <DefaultLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'game',
            children: [
              {
                path: ':id',
                element: (
                  <Suspense fallback={<GameDetailsSkeleton />}>
                    <GameDetailPage />
                  </Suspense>
                ),
              },
            ],
          },
          // pages below might be replaced
        ],
      },
    ],
  },
  {
    element: <AnonRoute />,
    children: [
      {
        path: 'signup',
        element: <SignupPage />,
        action: signUpAction,
      },
      {
        path: 'login',
        element: <LoginPage />,
        action: loginAction,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
