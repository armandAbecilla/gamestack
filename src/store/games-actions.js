import { projectConfig } from '../config'; // environment variable
import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

const MAX_PAGE_SIZE = 25;

export const fetchUserGames = createAsyncThunk(
  'games/fetchUserGames',
  async ({ keyword = '', page = 1, limit = MAX_PAGE_SIZE }, thunkAPI) => {
    try {
      let url = `${projectConfig.API_URL}/games?page=${page}&limit=${limit}`;
      if (keyword) {
        url += `&search=${keyword}`;
      }

      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Failed to fetch games');
    }
  },
);

export const fetchSelectedGame = createAsyncThunk(
  'games/fetchSelectedGame',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${projectConfig.API_URL}/games/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Failed to fetch the selected game');
    }
  },
);
