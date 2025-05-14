import { useParams } from 'react-router-dom';
import GameDetails from '../../components/GameDetails';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';

import queryClient from '../../api/index';
import {
  fetchGameDetails,
  fetchUserGameDetail,
  addGameToList,
  removeGameFromList,
  updateUserGameData,
} from '../../api/games';

export default function GameDetailPage() {
  const auth = useSelector((state) => state.auth);
  const params = useParams();
  const userGameKey = ['userGame', params.id, auth.user.id]; // keys for queryKey

  // game information
  const { data: gameData, isPending: isGameFetching } = useQuery({
    queryKey: ['selectedGame', params.id],
    queryFn: ({ signal }) => {
      return fetchGameDetails({ signal, gameId: params.id });
    },
    refetchOnWindowFocus: false,
  });

  const { data: userGameData } = useQuery({
    queryKey: userGameKey,
    queryFn: ({ signal, queryKey }) => {
      return fetchUserGameDetail({
        signal,
        userId: auth.user.id,
        gameId: params.id,
      });
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateAddToLibrary } = useMutation({
    mutationFn: addGameToList,
    onMutate: async ({ data }) => {
      const gameToAdd = data;
      await queryClient.cancelQueries({
        queryKey: userGameKey,
      });
      const previousUserData = queryClient.getQueryData(userGameKey);

      queryClient.setQueryData(userGameKey, gameToAdd);

      return {
        previousUserData: previousUserData,
      };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(userGameKey, null);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: userGameKey,
      });
    },
  });

  const { mutate: mutateRemoveFromLibrary } = useMutation({
    mutationFn: removeGameFromList,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: userGameKey,
      });
      const previousUserData = queryClient.getQueryData(userGameKey);

      queryClient.setQueryData(userGameKey, null);

      return {
        previousUserData: previousUserData,
      };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(userGameKey, context.previousUserData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: userGameKey,
      });
    },
  });

  const { mutate: mutateUpdateUserGameData } = useMutation({
    mutationFn: updateUserGameData,
    onMutate: async (data) => {
      const updatedData = data.gameData;
      await queryClient.cancelQueries({
        queryKey: userGameKey,
      });
      const previousUserData = queryClient.getQueryData(userGameKey);

      queryClient.setQueryData(userGameKey, updatedData);

      return {
        previousUserData: previousUserData,
      };
    },
    onError: (error, data, context) => {
      console.log(error);
      queryClient.setQueryData(userGameKey, context.previousUserData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: userGameKey,
      });
    },
  });

  async function handleAddToLibrary() {
    if (!userGameData) {
      const data = {
        userId: auth.user.id,
        rawgGameId: params.id,
        status: '',
        notes: 'test',
      };

      mutateAddToLibrary({
        data: data,
      });
    }
  }

  async function handleRemoveFromLibrary() {
    // if action == remove from library
    if (userGameData) {
      mutateRemoveFromLibrary({ id: userGameData.id });
    }
  }

  async function handleStatusChange(status) {
    const updatedData = {
      ...userGameData,
      status: status,
    };

    mutateUpdateUserGameData({
      id: userGameData.id,
      gameData: updatedData,
    });
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
