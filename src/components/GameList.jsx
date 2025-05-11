// components
import GameCard from './GameCard';
import Pagination from './UI/Pagination';

// react hooks
import { useEffect, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserGames } from '../store/games-actions';

const MAX_PAGE_SIZE = 25;

export default function GameList() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userGames = useSelector((state) => state.games.games);
  const isLoading = useSelector((state) => state.games.isLoading);
  const totalGameCount = useSelector((state) => state.games.totalGames);

  console.log(userGames);

  // Pagination state
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchUserGames({
        userId: auth.user.id,
        page: page,
      }),
    );
    // page as deps since we do want to re-run api call if page changes
  }, [page, dispatch, auth.user.id]);

  // pagination functions
  async function handleOnSetPage(page) {
    setPage(page);
  }

  if (isLoading) {
    return <p className='text-center text-4xl'>Getting your games...</p>;
  }

  if (!isLoading && totalGameCount == 0) {
    return (
      <p className='text-center text-4xl'>
        Start adding games to your backlog now!
      </p>
    );
  }

  return (
    <div>
      <Pagination
        pageSize={MAX_PAGE_SIZE}
        paginatingItemsClassNames='grid grid-cols-2 gap-4 xl:grid-cols-4'
        currentPage={page}
        isDataFromServer={true}
        totalCount={totalGameCount}
        onSetPage={handleOnSetPage}
      >
        {userGames.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            name={game.name}
            image={game.background_image}
          />
        ))}
      </Pagination>
    </div>
  );
}
