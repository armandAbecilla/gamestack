import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  action: null,
};

const userActionSlice = createSlice({
  name: 'userAction',
  initialState: initialState,
  reducers: {
    showAdd(state) {
      state.action = 'add';
    },
    showGameDetailView(state) {
      state.action = 'view';
    },
    showEditNote(state) {
      state.action = 'editNote';
    },
    resetAction(state) {
      state.action = null;
    },
  },
});

export const userActions = userActionSlice.actions;

export default userActionSlice.reducer;
