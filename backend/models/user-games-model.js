import { createClient } from '@supabase/supabase-js';
import { SUPA_BASE, RAWG } from '../config/config.js';

// Create a single supabase client for interacting with your database
const supabase = createClient(SUPA_BASE.url, SUPA_BASE.secretKey);

export const getUserGames = async function () {
  const { data, error } = await supabase
    .from('UserGames')
    .select('*, UserGamesMapping(*)');

  const games = data.map((i) => ({
    id: i.id,
    platform: i.platform,
    status: i.status,
    details: i.UserGamesMapping[0],
  }));

  return games;
};

export const addUserGame = async function (gameData) {
  const rawgDbRes = await fetch(
    `https://api.rawg.io/api/games?key=${RAWG.apiKey}&page_size=1&search=${gameData.name}`,
  );
  const rawgDbResData = await rawgDbRes.json();

  if (!rawgDbResData?.results?.length) {
    throw new Error('Game not found.');
  }

  try {
    const newGame = {
      platform: gameData.platform,
      status: gameData.status,
      notes: gameData?.notes || null,
    };

    const { data: userGameData, error: userGameError } = await supabase
      .from('UserGames')
      .insert(newGame)
      .select();

    console.log(userGameData);

    if (userGameError) {
      throw new Error(userGameError.message);
    }

    const gameDetails = {
      user_game_id: userGameData[0].id,
      platform_id: rawgDbResData.results[0].id,
      name: rawgDbResData.results[0].name,
      background_image: rawgDbResData.results[0].background_image,
    };

    const { data: userGamesMappingData, error: userGameMappingError } =
      await supabase.from('UserGamesMapping').insert(gameDetails).select();

    if (userGameMappingError) {
      throw new Error(userGameMappingError.message);
    }

    const result = {
      ...userGameData[0],
      details: userGamesMappingData,
    };

    return result;
  } catch (error) {
    throw new Error(error);
  }
};
