// components
import GameCard from './GameCard';
import Pagination from './UI/Pagination';

// react hooks
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import querySelector from '../api/index';
import { fetchUserGames, MAX_PAGE_SIZE } from '../api/games';

export default function GameList({ filters }) {
  const auth = useSelector((state) => state.auth);
  // Pagination state
  const [page, setPage] = useState(1);

  const gamesQueryKey =
    filters?.status || filters?.title
      ? ['games', page, filters]
      : ['games', page];

  useEffect(() => {
    querySelector.invalidateQueries(['games']);
  }, [filters]);

  // react query
  const {
    data,
    isPending: isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: gamesQueryKey,
    queryFn: ({ signal }) =>
      fetchUserGames({
        signal,
        userId: auth.user.id,
        page: page,
        filters: filters,
      }),
  });

  // pagination functions
  async function handleOnSetPage(page) {
    setPage(page);
  }

  if (isLoading) {
    return <p className='text-center text-4xl'>Getting your games...</p>;
  }

  if (!isLoading && data.count === 0) {
    return (
      <p className='text-center text-4xl'>
        Start adding games to your backlog now!
      </p>
    );
  }

  return (
    <div>
      {data && (
        <Pagination
          pageSize={MAX_PAGE_SIZE}
          paginatingItemsClassNames='grid grid-cols-2 gap-4 xl:grid-cols-4'
          currentPage={page}
          isDataFromServer={true}
          totalCount={data.count}
          onSetPage={handleOnSetPage}
        >
          {data.games.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              name={game.name}
              image={game.background_image}
            />
          ))}
        </Pagination>
      )}
    </div>
  );
}
