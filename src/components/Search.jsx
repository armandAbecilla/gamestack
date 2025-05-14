// components
import SearchInput from './UI/SearchInput';
import Skeleton from 'react-loading-skeleton';

// react hooks
import { useState, useEffect, useRef } from 'react';

// custom hooks
import useDebounce from '../hooks/useDebounce';

// redux
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchGameByKeyword } from '../api/games';

export default function Search() {
  const [search, setSearch] = useState('');
  const [isSearchOpen, setIssearchOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(search, 1000);
  const searchRef = useRef();

  const {
    data: searchResult,
    isPending: isSearching,
    isError,
    error,
  } = useQuery({
    queryKey: ['games', debouncedSearchTerm],
    queryFn: ({ signal }) =>
      fetchGameByKeyword({ signal, searchTerm: debouncedSearchTerm }),
    enabled: debouncedSearchTerm !== '',
  });

  useEffect(() => {
    if (searchResult) {
      setIssearchOpen(true);
    }

    return () => {
      setIssearchOpen(false);
    };
  }, [searchResult, debouncedSearchTerm]);

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

  let searchResultContent;

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
      {searchResult?.map((game) => (
        <li key={game.id} className='border-stone-600 p-1 not-first:border-t'>
          <Link to={`/game/${game.id}`} className='flex items-center gap-5'>
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

  if (isSearching) {
    searchResultContent = skeletonLoaders;
  }

  if (searchResult) {
    searchResultContent = searchResultList;
  }

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
