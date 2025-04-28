import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  games: {
    count: 0,
    data: [],
  },
  selectedGameData: null,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState: initialState,
  reducers: {
    setLoadedGames(state, action) {
      state.games = action.payload;
    },
    addItem(state, action) {
      state.games.unshift(action.payload);
    },
    setSelectedGame(state, action) {
      state.selectedGameData = action.payload;
    },
  },
});

export const gamesActions = gamesSlice.actions;

export default gamesSlice.reducer;
