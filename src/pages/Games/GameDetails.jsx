import FancySelect from '../../components/UI/FancySelect';
import { useParams } from 'react-router-dom';

// assets and static data
import editIcon from '../../assets/edit.png';
import { statusOptions } from '../../data/dropdowns';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserGameData } from '../../store/games-actions';
import { userActions } from '../../store/userActions';
import { fetchSelectedGame } from '../../store/games-actions';
import { gamesActions } from '../../store/games';

export default function GameDetailsPage() {
  const params = useParams();
  const gameData = useSelector((state) => state.games.selectedGameData);
  const isGameFetching = useSelector(
    (state) => state.games.isSelectedGameFetching,
  );

  const dispatch = useDispatch();
  const [status, setStatus] = useState();

  useEffect(() => {
    const loadSelectedGame = async () => {
      const game = await dispatch(fetchSelectedGame(params.id));

      if (game) {
        dispatch(gamesActions.setSelectedGame(game.payload.data));
      }
    };

    loadSelectedGame();
  }, [params.id, dispatch]);

  function handleStatusChange(value) {
    const id = gameData.id;
    const updatedData = {
      ...gameData,
      status: value,
    };

    dispatch(
      updateUserGameData({
        id: id,
        gameData: updatedData,
      }),
    );

    setStatus(value);
  }

  function handleEdit() {
    dispatch(userActions.resetAction());
    dispatch(userActions.showEditNote());
  }

  if (isGameFetching) {
    return <p>Loading your game...</p>;
  }

  return (
    <>
      {gameData && (
        <div className='flex flex-col'>
          <div className='relative'>
            <img
              src={gameData.details.background_image}
              alt={gameData.details.name}
              className='aspect-video h-[600px] w-full object-cover'
            />
          </div>
          <div className='flex w-full flex-col gap-4 p-5'>
            <div className='flex flex-col gap-4 xl:flex-row xl:items-center'>
              <h3 className='font-heading order-1 text-3xl text-white xl:order-0'>
                {gameData.details.name}
              </h3>
              <FancySelect
                className='order-0 xl:order-1'
                options={statusOptions}
                defaultValue={gameData?.status}
                onChange={handleStatusChange}
                value={status}
              />
            </div>

            <div className='flex flex-col'>
              <div
                className={`view-game-modal-description text-stone-200`}
                dangerouslySetInnerHTML={{
                  __html: gameData.description,
                }}
              />
            </div>

            <div className='mt-10'>
              <h4 className='font-heading mb-2 flex items-center text-xl text-stone-300'>
                Your Notes
                <img
                  className='ml-2 aspect-square h-6 cursor-pointer'
                  src={editIcon}
                  alt='pencil'
                  onClick={handleEdit}
                />
              </h4>
              <p className='whitespace-pre-wrap text-stone-200'>
                {gameData.notes}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
