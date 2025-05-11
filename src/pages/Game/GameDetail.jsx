import { projectConfig } from '../../config';
import axios from 'axios';
// this component is for the Game information, data will be fetched from RAWG.io API
// and also include other information specific to user such as STATUS and NOTE

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import GameDetailsSkeleton from '../../components/skeleton-loaders/GameDetails';

const fetchGameDetails = async (gameId) => {
  const result = await axios.get(`${projectConfig.API_URL}/rawg/${gameId}`);
  return result.data;
};

export default function GameDetailPage() {
  const [gameData, setGameData] = useState();
  const [isGameFetching, setIsGameFetching] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchSelectedGame = async () => {
      setIsGameFetching(true);
      const gameDetails = await fetchGameDetails(params.id);
      setGameData(gameDetails);
      setIsGameFetching(false);
    };

    fetchSelectedGame();
  }, [params.id]);

  //  skeleton loader
  if (isGameFetching) {
    return <GameDetailsSkeleton />;
  }

  const platforms = gameData
    ? gameData.platforms.map((item, index) => (
        <span key={item.platform.id}>
          {item.platform.name}
          {index !== gameData.platforms.length - 1 ? ', ' : ''}
        </span>
      ))
    : [];

  const developers = gameData
    ? gameData.developers.map(
        (devs, index) =>
          `${devs.name}${index !== gameData.developers.length - 1 ? ', ' : ''}`,
      )
    : [];

  const pcPlatform = gameData
    ? gameData.platforms.find((item) => item.platform.name === 'PC')
    : null;

  // System Requirements
  const minimumRequirement = pcPlatform ? (
    <span className='mb-1 block whitespace-pre-line'>
      {pcPlatform?.requirements?.minimum ||
        'Minimum requirements not yet available'}
    </span>
  ) : undefined;
  const recommendedRequirement = pcPlatform ? (
    <span className='mb-1 block whitespace-pre-line'>
      {pcPlatform?.requirements?.recommended ||
        'Recommended requirements not yet available'}
    </span>
  ) : undefined;

  return (
    <>
      {gameData && !isGameFetching && (
        <div>
          <div className='flex gap-5'>
            <img
              className='aspect-auto h-[700px] max-w-[500px] object-cover'
              src={gameData.background_image}
            />
            <div className='flex flex-col gap-4'>
              <h1 className='font-heading text-5xl'>{gameData.name}</h1>
              <h4 className='text-stone-100'>
                Release date: {gameData.released}
              </h4>
              <div className='flex gap-2'>
                <h4 className='text-stone-100'>Available on:</h4>
                <p>{platforms}</p>
              </div>
              <span className='text-stone-100'>
                Metacritic Score: {gameData.metacritic || 'Not yet available'}
              </span>
              <span className='text-stone-100'>Developed by: {developers}</span>
              <h4 className='font-h mt-5 text-xl'>Description:</h4>
              <div
                className='flex flex-col gap-2 text-stone-300'
                dangerouslySetInnerHTML={{
                  __html: gameData.description,
                }}
              ></div>
            </div>
          </div>

          <div className='mt-4 border-t border-stone-700 pt-4'>
            <h4 className='text-xl text-stone-200'>PC System Requirements</h4>

            <div className='flex gap-15'>
              <div className='mt-4 basis-1/2'>{minimumRequirement}</div>
              <div className='mt-4 basis-1/2'>{recommendedRequirement}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// What is my strategy for this page??
// I think i will not use loader from route on this page since I want to show
// skeleton loaders for this
// will not use redux too since the only state I wanna manage is for the game
// data from RAWG API + status and note from supabase tables..
