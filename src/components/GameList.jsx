import { projectConfig } from '../config'; // environment variable

// components
import GameCard from './GameCard';
import Pagination from './UI/Pagination';

// react hooks
import { useEffect, useState } from 'react';

// custom hooks
import useHttp from '../hooks/useHttp';

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
  const filteredGames = filterBySearch(userGames, '') || userGames;

  return (
    <div>
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
