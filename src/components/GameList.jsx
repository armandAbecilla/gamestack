// components
import GameCard from './GameCard';
import Pagination from './UI/Pagination';

// react hooks
import { useEffect, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/userActions';
import { fetchUserGames, fetchSelectedGame } from '../store/games-actions';

const MAX_PAGE_SIZE = 25;

export default function GameList() {
  const dispatch = useDispatch();
  const userGames = useSelector((state) => state.games.games);
  const isLoading = useSelector((state) => state.games.isLoading);
  const totalGameCount = useSelector((state) => state.games.totalGames);
  const isSelectedGameFetching = useSelector(
    (state) => state.games.isSelectedGameFetching,
  );

  // Pagination state
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchUserGames({
        page: page,
      }),
    );
    // page as deps since we do want to re-run api call if page changes
  }, [page, dispatch]);

  async function handleGameSelect(id) {
    if (isSelectedGameFetching) return; // prevent rapid clicks

    const response = await dispatch(fetchSelectedGame(id));

    if (response.meta.requestStatus === 'fulfilled') {
      dispatch(userActions.showGameDetailView());
    }
  }

  // pagination functions
  async function handleOnSetPage(page) {
    setPage(page);
  }

  if (isLoading) {
    return <p className='text-center text-4xl'>Getting your games...</p>;
  }

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
        {userGames.map((game) => (
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
