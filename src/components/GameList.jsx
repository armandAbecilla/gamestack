import GameCard from './GameCard';
import { useContext } from 'react';
import GamesContext from '../store/GamesContext';

export default function GameList() {
  const { games, isGamesFetching } = useContext(GamesContext);

  if (isGamesFetching) {
    return <p className='text-center text-4xl'>Getting your games...</p>;
  }

  return (
    <div className='grid grid-cols-5 gap-4'>
      {games.map(({ id, details }) => (
        <GameCard
          key={id}
          name={details.name}
          image={details.background_image}
        />
      ))}
    </div>
  );
}
