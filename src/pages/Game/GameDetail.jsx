import { projectConfig } from '../../config';
import axios from 'axios';
// this component is for the Game information, data will be fetched from RAWG.io API
// and also include other information specific to user such as STATUS and NOTE

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GameDetails from '../../components/GameDetails';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserGameData } from '../../store/games-actions';

const fetchGameDetails = async (gameId) => {
  const result = await axios.get(`${projectConfig.API_URL}/rawg/${gameId}`);
  return result.data;
};

const fetchUserGameDetail = async (gameId, userId) => {
  const result = await axios.get(
    `${projectConfig.API_URL}/games/${gameId}?userId=${userId}`,
  );
  return result.data[0];
};

const addGameToList = async (data) => {
  const result = await axios.post(`${projectConfig.API_URL}/games/add`, data);
  return result.data;
};

const removeGameFromList = async (id) => {
  await axios.delete(`${projectConfig.API_URL}/games/${id}`);
};

export default function GameDetailPage() {
  const auth = useSelector((state) => state.auth);
  const params = useParams();
  const dispatch = useDispatch();
  // game information
  const [gameData, setGameData] = useState();
  const [isGameFetching, setIsGameFetching] = useState(false);
  // user information for the selected game, e.g: Is game added in library
  const [userGameData, setUserGameData] = useState();

  useEffect(() => {
    const fetchSelectedGame = async () => {
      setIsGameFetching(true);

      const [fetchedGameDetails, fetchedUserGameData] = await Promise.all([
        fetchGameDetails(params.id),
        fetchUserGameDetail(params.id, auth.user.id),
      ]);

      setGameData(fetchedGameDetails);
      setUserGameData(fetchedUserGameData);
      setIsGameFetching(false);
    };

    fetchSelectedGame();
  }, [params.id, auth.user.id]);

  async function handleAddToLibrary() {
    if (!userGameData) {
      const data = {
        userId: auth.user.id,
        rawgGameId: params.id,
        status: '',
        notes: 'test',
      };

      const res = await addGameToList(data);
      const newUserGameData = res.data[0];

      setUserGameData(newUserGameData);
    }
  }

  async function handleRemoveFromLibrary() {
    // if action == remove from library
    if (userGameData) {
      removeGameFromList(userGameData.id);
      setUserGameData(null);
    }
  }

  async function handleStatusChange(status) {
    const updatedData = {
      status: status,
    };

    const data = await dispatch(
      updateUserGameData({
        id: userGameData.id,
        gameData: updatedData,
      }),
    );

    if (data) {
      setUserGameData((prevdata) => ({
        ...prevdata,
        status: status,
      }));
    } else {
      setUserGameData(userGameData);
    }
  }

  return (
    <GameDetails
      gameData={gameData}
      isLoading={isGameFetching}
      userGameData={userGameData}
      onAddToLibrary={handleAddToLibrary}
      onRemoveFromLibrary={handleRemoveFromLibrary}
      onStatusChange={handleStatusChange}
    />
  );
}

// What is my strategy for this page??
// I think i will not use loader from route on this page since I want to show
// skeleton loaders for this
// will not use redux too since the only state I wanna manage is for the game
// data from RAWG API + status and note from supabase tables..
