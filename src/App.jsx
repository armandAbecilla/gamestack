import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DefaultLayout from './components/layout/Default';

import HomePage from './pages/Home';
import GameDetailsPage from './pages/Games/GameDetails';
import AddGamePage from './pages/Games/AddGame';
import SignupPage from './pages/Auth/Signup';
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
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
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
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
