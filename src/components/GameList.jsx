import GameCard from './GameCard';
import GamesContext from '../store/GamesContext';
import UserActionsContext from '../store/UserActionsContext';
import { useContext } from 'react';
import useHttp from '../hooks/useHttp';

const config = {};

export default function GameList() {
  const { games, isGamesFetching, setSelectedGame } = useContext(GamesContext);
  const { showGameDetailView } = useContext(UserActionsContext);
  const { isLoading: isSelectedGameFetching, sendRequest } = useHttp(
    '',
    config,
  ); // url will be supplied later via function

  if (isGamesFetching) {
    return <p className='text-center text-4xl'>Getting your games...</p>;
  }

  async function handleGameSelect(id) {
    const response = await sendRequest(`http://localhost:3000/games/${id}`);

    // set the data to be used by other components via GamesContext
    setSelectedGame(response.data);
    showGameDetailView();
  }

  return (
    <div className='grid grid-cols-5 gap-4'>
      {games.map((game) => (
        <GameCard
          key={game.id}
          name={game.details.name}
          image={game.details.background_image}
          onGameSelect={() => handleGameSelect(game.id)}
        />
      ))}
    </div>
  );
}
