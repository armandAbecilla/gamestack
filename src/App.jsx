import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DefaultLayout from './components/Layout/Default';

import HomePage from './pages/Home';
import GameDetailsPage from './pages/Games/GameDetails';
import AddGamePage from './pages/Games/AddGame';

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
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
