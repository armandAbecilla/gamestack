import { projectConfig } from '../config'; // environment variable
import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

const MAX_PAGE_SIZE = 25;

export const fetchUserGames = createAsyncThunk(
  'games/fetchUserGames',
  async ({ userId, status, page = 1, limit = MAX_PAGE_SIZE }, thunkAPI) => {
    try {
      let url = `${projectConfig.API_URL}/games/user/${userId}?page=${page}&limit=${limit}`;

      if (status) {
        url += '&status=' + status;
      }

      const response = await axios.get(url);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue('Failed to fetch games');
    }
  },
);

export const updateUserGameData = createAsyncThunk(
  'games/upateNotes',
  async ({ id, gameData }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${projectConfig.API_URL}/games/${id}`,
        gameData,
      );

      return response.data;
    } catch {
      return thunkAPI.rejectWithValue('Failed to update data.');
    }
  },
);
