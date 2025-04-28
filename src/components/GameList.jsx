import { projectConfig } from '../config'; // environment variable

// components
import GameCard from './GameCard';
import Stats from './Stats';
import SearchInput from './UI/SearchInput';
import Pagination from './UI/Pagination';

// react hooks
import { useEffect, useState } from 'react';

// custom hooks
import useHttp from '../hooks/useHttp';
import useDebounce from '../hooks/useDebounce';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { gamesActions } from '../store/games';
import { userActions } from '../store/user-actions';

const config = {}; // useHttp config

const MAX_PAGE_SIZE = 25;

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
  const { data: userGames, count: totalGameCount } = useSelector(
    (state) => state.games.games,
  );

  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search, 1000);

  // User Games
  const {
    data: loadedUserGames,
    isLoading: isUserGamesLoading,
    sendRequest: fetchGames,
  } = useHttp(`${projectConfig.API_URL}/games`, config);

  // Selected Game
  const { isLoading: isSelectedGameFetching, sendRequest } = useHttp(
    '',
    config,
  ); // url will be supplied later via function

  // Pagination state
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (loadedUserGames && loadedUserGames.count !== 0) {
      dispatch(gamesActions.setLoadedGames(loadedUserGames));
    }
  }, [loadedUserGames, dispatch]);

  // for debouncing the search input
  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

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
    dispatch(gamesActions.setSelectedGame(response.data));
    dispatch(userActions.showGameDetailView());
  }

  // pagination functions
  async function handleOnSetPage(page) {
    setPage(page);
    const data = await fetchGames(
      `${projectConfig.API_URL}/games?page=${page}&limit=${MAX_PAGE_SIZE}`,
    );

    dispatch(gamesActions.setLoadedGames(data));
  }

  if (isUserGamesLoading) {
    return <p className='text-center text-4xl'>Getting your games...</p>;
  }

  // derive the filteredGames, might change if we decide to filter via http response
  const filteredGames =
    filterBySearch(userGames, debouncedSearchTerm) || userGames;

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

      <Stats />

      {/* make sure to display only when currentSearchInput value matches the debounceSearchInput  */}
      {debouncedSearchTerm === search &&
        filteredGames.length === 0 &&
        search !== '' && (
          <p className='text-center text-4xl'>Could not find {search}.</p>
        )}

      {/* <div className='mt-8 grid grid-cols-2 gap-4 xl:grid-cols-5'>
       
      </div> */}

      <Pagination
        pageSize={MAX_PAGE_SIZE}
        paginatingItemsClassNames='mt-8 grid grid-cols-2 gap-4 xl:grid-cols-5'
        currentPage={page}
        isDataFromServer={true}
        totalCount={totalGameCount}
        onSetPage={handleOnSetPage}
      >
        {filteredGames.map((game) => (
          <GameCard
            key={game.id}
            name={game.details.name}
            image={game.details.background_image}
            onGameSelect={() => handleGameSelect(game.id)}
          />
        ))}
      </Pagination>
    </div>
  );
}
