import { projectConfig } from '../config';
import axios from 'axios';

export const MAX_PAGE_SIZE = 25;

export const fetchUserGames = async ({
  signal,
  userId,
  page,
  filters,
  limit = MAX_PAGE_SIZE,
}) => {
  try {
    let url = `${projectConfig.API_URL}/games/user/${userId}?page=${page}&limit=${limit}`;

    if (filters?.status) {
      url += '&status=' + filters.status;
    }

    if (filters?.title) {
      url += '&title=' + filters.title;
    }

    const response = await axios.get(url, { signal: signal });
    return response.data;
  } catch (e) {
    return new Response(
      {
        message: e.message || 'Could not fetch user games',
      },
      { status: 500 },
    );
  }
};

export const fetchGameByKeyword = async ({ signal, searchTerm }) => {
  console.log(searchTerm);
  const result = await axios.get(
    `${projectConfig.API_URL}/rawg/search?keyword=${searchTerm}`,
    { signal: signal },
  );

  return result.data.games;
};

export const fetchGameDetails = async ({ signal, gameId }) => {
  const result = await axios.get(`${projectConfig.API_URL}/rawg/${gameId}`, {
    signal: signal,
  });
  return result.data;
};

export const fetchUserGameDetail = async ({ signal, gameId, userId }) => {
  const result = await axios.get(
    `${projectConfig.API_URL}/games/${gameId}?userId=${userId}`,
    { signal: signal },
  );

  return result?.data[0] ?? null;
};

export const addGameToList = async ({ signal, data }) => {
  const result = await axios.post(`${projectConfig.API_URL}/games/add`, data, {
    signal: signal,
  });
  return result.data;
};

export const removeGameFromList = async ({ signal, id }) => {
  await axios.delete(`${projectConfig.API_URL}/games/${id}`, {
    signal: signal,
  });
};

export const updateUserGameData = async ({ signal, id, gameData }) => {
  try {
    const response = await axios.patch(
      `${projectConfig.API_URL}/games/${id}`,
      gameData,
      { signal: signal },
    );

    return response.data ?? null;
  } catch (e) {
    return new Response(
      {
        message: e.message || 'Failed to update data.',
      },
      { status: 500 },
    );
  }
};
