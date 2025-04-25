import { projectConfig } from '../config';
import GameCard from './GameCard';
import GamesContext from '../store/GamesContext';
import UserActionsContext from '../store/UserActionsContext';
import { useContext, useEffect, useState } from 'react';
import useHttp from '../hooks/useHttp';
import useDebounce from '../hooks/useDebounce';
import SearchInput from './UI/SearchInput';

const API_URL = import.meta.env.VITE_API_URL;
const config = {};

function filterBySearch(games, keyword) {
  if (!games) return;
  if (!keyword || keyword === '' || keyword === null || keyword === undefined) {
    return games;
  }
  const filteredGames = games.filter((game) =>
    game.details.name.toLowerCase().includes(keyword.toLowerCase()),
  );
  return filteredGames;
}

export default function GameList() {
  const { games, isGamesFetching, setSelectedGame, setLoadedGames } =
    useContext(GamesContext);
  const { showGameDetailView } = useContext(UserActionsContext);
  const { isLoading: isSelectedGameFetching, sendRequest } = useHttp(
    '',
    config,
  ); // url will be supplied later via function
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search, 1000);

  function handleSearchChange(e) {
    const value = e.target.value;
    setSearch(value);
  }

  function handleClearSearch() {
    setSearch('');
  }

  async function handleGameSelect(id) {
    if (isSelectedGameFetching) return;

    const response = await sendRequest(`${projectConfig.API_URL}/games/${id}`);
    // set the data to be used by other components via GamesContext
    setSelectedGame(response.data);
    showGameDetailView();
  }

  // for debouncing the search input
  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  if (isGamesFetching) {
    return <p className='text-center text-4xl'>Getting your games...</p>;
  }

  // derive the filteredGames, might change if we decide to filter via http response
  const filteredGames = filterBySearch(games, debouncedSearchTerm) || games;

  return (
    <div>
      <div className='bg-darkgreen/10 p- mb-5 rounded-full border border-white/15 p-3 shadow-2xl backdrop-blur-md'>
        <SearchInput
          value={search}
          className='rounded-full bg-white px-5 text-stone-800'
          placeholder='Search'
          onChange={handleSearchChange}
          onClear={handleClearSearch}
        />
      </div>

      {/* make sure to display only when currentSearchInput value matches the debounceSearchInput  */}
      {debouncedSearchTerm === search &&
        filteredGames.length === 0 &&
        search !== '' && (
          <p className='text-center text-4xl'>Could not find {search}.</p>
        )}

      <div className='grid grid-cols-5 gap-4'>
        {filteredGames.map((game) => (
          <GameCard
            key={game.id}
            name={game.details.name}
            image={game.details.background_image}
            onGameSelect={() => handleGameSelect(game.id)}
          />
        ))}
      </div>
    </div>
  );
}
