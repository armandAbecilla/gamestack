import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DefaultLayout from './components/layout/Default';

import HomePage from './pages/Home';
import GameDetailsPage from './pages/Games/GameDetails';
import AddGamePage from './pages/Games/AddGame';
import SignupPage, { action as signUpAction } from './pages/Auth/Signup';
import LoginPage from './pages/Auth/Login';

const router = createBrowserRouter([
  {
    path: '',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
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
  {
    path: 'signup',
    element: <SignupPage />,
    action: signUpAction,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
