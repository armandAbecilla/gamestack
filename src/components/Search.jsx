// components
import SearchInput from './UI/SearchInput';

// react hooks
import { useState, useEffect, useRef } from 'react';

// custom hooks
import useDebounce from '../hooks/useDebounce';

// redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchUserGames } from '../store/games-actions';

export default function Search() {
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search, 1000);
  const searchCount = useSelector((state) => state.games.totalGames);
  const isLoading = useSelector((state) => state.games.isLoading);
  const dispatch = useDispatch();
  const isInitialLoad = useRef(true);

  // for debouncing the search input
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    dispatch(
      fetchUserGames({
        keyword: debouncedSearchTerm,
      }),
    );
  }, [dispatch, debouncedSearchTerm]);

  async function handleSearchChange(e) {
    const value = e.target.value;
    setSearch(value);
  }

  function handleClearSearch() {
    setSearch('');
  }

  return (
    <>
      {/* make sure to display only when currentSearchInput value matches the debounceSearchInput  */}
      {debouncedSearchTerm === search &&
        search !== '' &&
        searchCount === 0 &&
        !isLoading && (
          <p className='mb-4 text-center text-3xl'>Could not find {search}.</p>
        )}

      <div className='bg-darkgreen/10 p- mb-5 rounded-full border border-white/15 p-3 shadow-2xl backdrop-blur-md'>
        <SearchInput
          value={search}
          className='rounded-full bg-white px-5 text-stone-800'
          placeholder='Search'
          onChange={handleSearchChange}
          onClear={handleClearSearch}
        />
      </div>
    </>
  );
}
