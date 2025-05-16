import GameDetails from '../../components/GameDetails';
import EditNotesModal from '../../components/EditNotesModal';
import { useNavigate, useParams } from 'react-router-dom';
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
import { useState } from 'react';
import Button from '../../components/UI/Button';

const useOptimisticUpdating = (queryKey, mutationFn, options = {}) => {
  return useMutation({
    mutationFn: mutationFn,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: queryKey,
      });

      const prevData = queryClient.getQueryData(queryKey);
      // set data
      queryClient.setQueryData(queryKey, newData);

      return {
        prevData: prevData,
      };
    },
    onError: (error, data, context) => {
      // revert to previous data if an error occurs
      queryClient.setQueryData(queryKey, context.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
    ...options,
  });
};

export default function GameDetailPage() {
  const auth = useSelector((state) => state.auth);
  const params = useParams();
  const userGameKey = ['userGame', params.id, auth.user.id]; // keys for queryKey
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const navigate = useNavigate();

  // game information
  const { data: gameData, isPending: isGameFetching } = useQuery({
    queryKey: ['selectedGame', params.id],
    queryFn: ({ signal }) => {
      return fetchGameDetails({ signal, gameId: params.id });
    },
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
  });

  const mutateAddToLibrary = useOptimisticUpdating(userGameKey, addGameToList, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['games'],
      });
    },
  });
  const mutateRemoveFromLibrary = useOptimisticUpdating(
    userGameKey,
    removeGameFromList,
  );
  const mutateUpdateUserGameData = useOptimisticUpdating(
    userGameKey,
    updateUserGameData,
  );

  async function handleAddToLibrary() {
    if (!userGameData) {
      mutateAddToLibrary.mutate({
        data: {
          userId: auth.user.id,
          rawgGameId: params.id,
          rawgGameTitle: gameData.name,
          status: '',
          notes: 'test',
        },
      });
    }
  }

  async function handleRemoveFromLibrary() {
    // if action == remove from library
    if (userGameData) {
      mutateRemoveFromLibrary.mutate({ id: userGameData.id });
    }
  }

  async function handleStatusChange(status) {
    mutateUpdateUserGameData.mutate({
      id: userGameData.id,
      gameData: {
        ...userGameData,
        status,
      },
    });
  }

  function handleUpdateNote(updatedNote) {
    mutateUpdateUserGameData.mutate({
      id: userGameData.id,
      gameData: {
        ...userGameData,
        notes: updatedNote,
      },
    });
  }

  // Edit notes handlers
  function handleOpenModal() {
    setNotesModalOpen(true);
  }

  function handleCloseModal() {
    setNotesModalOpen(false);
  }

  return (
    <>
      <Button onClick={() => navigate(-1)} className='mb-4 text-lg' textOnly>
        ← Back to your library
      </Button>
      <GameDetails
        gameData={gameData}
        isLoading={isGameFetching}
        userGameData={userGameData}
        onAddToLibrary={handleAddToLibrary}
        onRemoveFromLibrary={handleRemoveFromLibrary}
        onStatusChange={handleStatusChange}
        onEditNote={handleOpenModal}
      />

      <EditNotesModal
        gameTitle={gameData?.name}
        open={notesModalOpen}
        userGameData={userGameData}
        onClose={handleCloseModal}
        onUpdateNote={handleUpdateNote}
        isUpdating={mutateUpdateUserGameData.isPending}
      />
    </>
  );
}

// What is my strategy for this page??
// I think i will not use loader from route on this page since I want to show
// skeleton loaders for this
// will not use redux too since the only state I wanna manage is for the game
// data from RAWG API + status and note from supabase tables..
