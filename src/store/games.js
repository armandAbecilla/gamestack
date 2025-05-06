import { createSlice } from '@reduxjs/toolkit';
import { fetchUserGames, fetchSelectedGame } from './games-actions';

const initialState = {
  games: [],
  isLoading: false,
  totalGames: 0,
  selectedGameData: null,
  isSelectedGameFetching: false,
};

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
      .addCase(fetchUserGames.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserGames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.games = action.payload.data;
        state.totalGames = action.payload.count;
      })
      .addCase(fetchUserGames.rejected, (state) => {
        state.isLoading = false;
      })
      // Fetch Selected game
      .addCase(fetchSelectedGame.pending, (state) => {
        state.isSelectedGameFetching = true;
      })
      .addCase(fetchSelectedGame.fulfilled, (state, action) => {
        state.isSelectedGameFetching = false;
        state.selectedGameData = action.payload.data;
      })
      .addCase(fetchSelectedGame.rejected, (state) => {
        state.isSelectedGameFetching = false;
      });
  },
});

export const gamesActions = gamesSlice.actions;

export default gamesSlice.reducer;
