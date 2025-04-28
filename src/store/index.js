import { configureStore } from '@reduxjs/toolkit';

import gamesReducer from './games';
import userActionsReducer from './user-actions';

const store = configureStore({
  reducer: {
    games: gamesReducer,
    userActions: userActionsReducer,
  },
});

export default store;
