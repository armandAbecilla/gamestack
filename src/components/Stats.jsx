import { useContext } from 'react';
import ShuffleCounter from './UI/ShuffleCounter';
import GamesContext from '../store/GamesContext';

export default function Stats() {
  const { games } = useContext(GamesContext);
  const playingCount = games.filter((game) => game.status === 'playing').length;
  const completedCount = games.filter(
    (game) => game.status === 'completed',
  ).length;
  const backlogCount = games.filter((game) => game.status === 'backlog').length;
  const wishlistCount = games.filter(
    (game) => game.status === 'wishlist',
  ).length;

  return (
    <div className='bg-black-200/90 mx-auto grid grid-cols-2 justify-between rounded-xl border border-stone-600/50 p-2 px-5 backdrop-blur-lg sm:flex'>
      <div className='col-span-2 flex items-center gap-2'>
        <h3 className='font-heading text-xl font-semibold uppercase'>Games:</h3>
        <ShuffleCounter count={games.length} />
      </div>
      <div className='flex items-center gap-2'>
        <h3 className='font-heading text-playing text-xl font-semibold'>
          Playing:
        </h3>
        <ShuffleCounter count={playingCount} />
      </div>
      <div className='flex items-center gap-2'>
        <h3 className='font-heading text-darkgreen text-xl font-semibold'>
          Completed:
        </h3>
        <ShuffleCounter count={completedCount} />
      </div>
      <div className='flex items-center gap-2'>
        <h3 className='font-heading text-backlog text-xl font-semibold'>
          Backlog:
        </h3>
        <ShuffleCounter count={backlogCount} />
      </div>
      <div className='flex items-center gap-2'>
        <h3 className='font-heading text-wishlist text-xl font-semibold'>
          Wishlist:
        </h3>
        <ShuffleCounter count={wishlistCount} />
      </div>
    </div>
  );
}
