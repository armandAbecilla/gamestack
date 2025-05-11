import Search from '../components/Search';
import GameList from '../components/GameList';
import Sidebar from '../components/Sidebar';
export default function HomePage() {
  return (
    <>
      <Search />
      <div className='mt-4 flex flex-col gap-10 xl:flex-row xl:gap-4'>
        <div className='xl:w-1/6'>
          <Sidebar />
        </div>
        <div className='w-full'>
          <GameList />
        </div>
      </div>
    </>
  );
}
