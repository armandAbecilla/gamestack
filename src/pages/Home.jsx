import Search from '../components/Search';
import GameList from '../components/GameList';
import Sidebar from '../components/Sidebar';
import useDebounce from '../hooks/useDebounce';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function HomePage() {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({});
  const deboucedFilters = useDebounce(filters, 1000);

  function handleFilterChange(newFilters) {
    setFilters(newFilters);

    // Might be used later
    // const params = {};
    // if (newFilters?.status) params.status = newFilters.status;
    // if (newFilters?.title) params.title = newFilters.title;
    // setSearchParams(params);
  }

  return (
    <>
      <Search />
      <div className='mt-10 flex flex-col gap-10 xl:flex-row xl:gap-8'>
        <div className='glass-black min-h-[400px] rounded-sm border border-stone-600 p-4 xl:w-1/4'>
          <Sidebar onFilterChange={handleFilterChange} />
        </div>

        <div className='w-full'>
          <GameList filters={deboucedFilters} />
        </div>
      </div>
    </>
  );
}
