/*
 * ╔════════════════════════════════════════════════════╗
 * ║                                                    ║
 * ║ This is an unused code. Use this as reference only ║
 * ║                                                    ║
 * ╚════════════════════════════════════════════════════╝
 */

import { createSlice } from '@reduxjs/toolkit';
import { fetchUserGames } from './games-actions';

const initialState = {
  games: [],
  isLoading: false,
  totalGames: 0,
  selectedGameData: null,
  isSelectedGameFetching: false,
  isAddGameLoading: false,
};

// Utility function to handle pending/rejected state
// const setLoadingState = (key, value) => (state) => {
//   state[key] = value;
// };

function setLoadingState(key, value) {
  return function (state) {
    state[key] = value;
  };
}

const gamesSlice = createSlice({
  name: 'games',
  initialState: initialState,
  reducers: {
    setLoadedGames(state, action) {
      state.games = action.payload.games;
      state.totalGames = action.payload.totalGames;
    },
    addItem(state, action) {
      state.games.unshift(action.payload);
    },
    setSelectedGame(state, action) {
      state.selectedGameData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Games
      .addCase(fetchUserGames.pending, setLoadingState('isLoading', true))
      .addCase(fetchUserGames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.games = action.payload.games;
        state.totalGames = action.payload.count;
      })
      .addCase(fetchUserGames.rejected, setLoadingState('isLoading', false));
  },
});

export const gamesActions = gamesSlice.actions;

export default gamesSlice.reducer;
