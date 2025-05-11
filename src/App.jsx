import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DefaultLayout from './components/Layout/DefaultLayout';
import HomePage from './pages/Home';
import GameDetailsPage from './pages/Games/GameDetails';
import AddGamePage from './pages/Games/AddGame';
import SignupPage, { action as signUpAction } from './pages/Auth/Signup';
import LoginPage, { action as loginAction } from './pages/Auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AnonRoute from './components/auth/AnonRoute';
import GameDetailPage from './pages/Game/GameDetail';

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
                element: <GameDetailPage />,
              },
            ],
          },
          // pages below might be replaced
          {
            path: 'games',
            children: [
              {
                path: ':id',
                element: <GameDetailsPage />,
              },
              {
                path: 'add',
                element: <AddGamePage />,
              },
            ],
          },
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
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
