import Stats from './Stats';
import Search from './Search';
import GameList from './GameList';
import Sidebar from './Sidebar';

export default function UserGames() {
  return (
    <>
      <Search />
      {/* <Stats /> */}
      <div className='mt-4 flex gap-4'>
        <div className='w-1/6'>
          <Sidebar />
        </div>
        <div className='w-full'>
          <GameList />
        </div>
      </div>
    </>
  );
}
