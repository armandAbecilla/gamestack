import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
// import gamesReducer from './games';
import userActionsReducer from './userActions';

function getUserFromLocalStorage() {
  try {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      return {
        auth: {
          user: JSON.parse(user),
          token: token,
        },
      };
    }
  } catch {
    return undefined;
  }
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    // games: gamesReducer,
    userActions: userActionsReducer,
  },
  preloadedState: getUserFromLocalStorage(),
});

export default store;
