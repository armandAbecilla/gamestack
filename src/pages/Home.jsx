import Search from '../components/Search';
import GameList from '../components/GameList';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';
export default function HomePage() {
  const [statusSelected, setStatusSelected] = useState(null);

  function handleStatusSelect(filter) {
    setStatusSelected(filter);
  }

  return (
    <>
      <Search />
      <div className='mt-4 flex flex-col gap-10 xl:flex-row xl:gap-4'>
        <div className='xl:w-1/6'>
          <Sidebar onStatusSelect={handleStatusSelect} />
        </div>
        <div className='w-full'>
          <GameList statusFilter={statusSelected} />
        </div>
      </div>
    </>
  );
}
