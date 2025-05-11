import { projectConfig } from '../config'; // environment variable
import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

const MAX_PAGE_SIZE = 25;

export const fetchUserGames = createAsyncThunk(
  'games/fetchUserGames',
  async ({ userId, page = 1, limit = MAX_PAGE_SIZE }, thunkAPI) => {
    try {
      let url = `${projectConfig.API_URL}/games/user/${userId}?page=${page}&limit=${limit}`;

      const response = await axios.get(url);
      return response.data;
    } catch {
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
    } catch {
      return thunkAPI.rejectWithValue('Failed to fetch the selected game');
    }
  },
);

export const addGame = createAsyncThunk(
  'games/addGame',
  async (gamedata, thunkAPI) => {
    try {
      const response = await axios.post(`${projectConfig.API_URL}/games/add`, {
        gameData: gamedata,
      });

      return response.data;
    } catch {
      return thunkAPI.rejectWithValue('Failed to add a game');
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
