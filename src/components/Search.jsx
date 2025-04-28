import { projectConfig } from '../config'; // environment variable

// components
import SearchInput from './UI/SearchInput';

// react hooks
import { useState, useEffect } from 'react';

// custom hooks
import useDebounce from '../hooks/useDebounce';
import useHttp from '../hooks/useHttp';

// redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { gamesActions } from '../store/games';

const config = {};

export default function Search() {
  const [search, setSearch] = useState('');
  const { count: searchCount } = useSelector((state) => state.games.games);
  const debouncedSearchTerm = useDebounce(search, 1000);
  const { sendRequest } = useHttp('', config);
  const dispatch = useDispatch();

  // for debouncing the search input
  useEffect(() => {
    const getSearchedGames = async (value) => {
      const data = await sendRequest(
        `${projectConfig.API_URL}/games?search=${value}`,
      );

      dispatch(gamesActions.setLoadedGames(data));
    };

    setSearch(() => {
      getSearchedGames(debouncedSearchTerm);
      return debouncedSearchTerm;
    });
  }, [debouncedSearchTerm]);

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
      {debouncedSearchTerm === search && search !== '' && searchCount === 0 && (
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
