import { projectConfig } from '../config';
import axios from 'axios';
// components
import SearchInput from './UI/SearchInput';

// react hooks
import { useState, useEffect, useRef } from 'react';

// custom hooks
import useDebounce from '../hooks/useDebounce';

// redux
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const fetchGameByKeyword = async (query) => {
  const result = await axios.get(
    `${projectConfig.API_URL}/rawg/search?keyword=${query}`,
  );

  return result.data.games;
};

export default function Search() {
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [isSearchOpen, setIssearchOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(search, 1000);
  const isInitialLoad = useRef(true);
  const searchRef = useRef();

  // Side Effects
  // for debouncing the search input
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    const fetchdata = async () => {
      setIsSearching(true);
      setIssearchOpen(true);

      const games = await fetchGameByKeyword(debouncedSearchTerm);
      if (games) {
        setSearchResult(games);
      }

      setIsSearching(false);
    };

    if (debouncedSearchTerm.trim() !== '') {
      fetchdata();
    }
  }, [debouncedSearchTerm]);

  // Close on outside click
  useEffect(() => {
    if (!isSearchOpen) return;

    const handleClickOutside = (e) => {
      if (!searchRef.current?.contains(e.target)) {
        setIssearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  // Event listeners

  async function handleSearchChange(e) {
    const value = e.target.value;
    setSearch(value);
  }

  function handleClearSearch() {
    setSearch('');
  }

  function handleSearchFocus() {
    if (search.trim() === '') return;
    setIssearchOpen(true);
  }

  const skeletonLoaders = (
    <ul>
      {[1, 2, 3, 4].map((i) => (
        <li key={i} className='border-stone-600 p-1 not-first:border-t'>
          <div className='flex items-center gap-5'>
            <Skeleton
              height={60}
              width={60}
              baseColor='#1b1b1b'
              highlightColor='#444'
            />
            <Skeleton
              height={20}
              count={2}
              width={600}
              baseColor='#1b1b1b'
              highlightColor='#444'
            />
          </div>
        </li>
      ))}
    </ul>
  );

  const searchResultList = (
    <ul>
      {searchResult.map((game) => (
        <li key={game.id} className='border-stone-600 p-1 not-first:border-t'>
          <Link className='flex items-center gap-5'>
            <img
              className='aspect-square h-15 object-cover'
              src={game.background_image}
            />
            <h4 className='text-xl'>{game.name}</h4>
          </Link>
        </li>
      ))}
    </ul>
  );

  const searchResultContent = isSearching ? skeletonLoaders : searchResultList;

  return (
    <>
      <div className='relative' ref={searchRef}>
        <div className='bg-darkgreen/10 rounded-full border border-white/15 p-3 shadow-2xl backdrop-blur-md'>
          <SearchInput
            value={search}
            className='rounded-full bg-white px-5 text-stone-800'
            placeholder='Search games to add to your library'
            onChange={handleSearchChange}
            onClear={handleClearSearch}
            onFocus={handleSearchFocus}
          />
        </div>

        {isSearchOpen && (
          <div className='absolute z-200 mt-4 w-full rounded-sm bg-white/20 p-1 shadow backdrop-blur-xl'>
            {searchResultContent}
          </div>
        )}
      </div>
    </>
  );
}
