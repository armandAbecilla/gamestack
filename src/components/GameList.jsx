// components
import GameCard from './GameCard';
import Pagination from './UI/Pagination';

// react hooks
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { fetchUserGames, MAX_PAGE_SIZE } from '../api/games';

export default function GameList({ statusFilter }) {
  const auth = useSelector((state) => state.auth);
  // Pagination state
  const [page, setPage] = useState(1);

  const gamesQueryKey = statusFilter
    ? ['games', page, statusFilter]
    : ['games', page];

  // react query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: gamesQueryKey,
    queryFn: ({ signal }) =>
      fetchUserGames({
        signal,
        userId: auth.user.id,
        page: page,
        status: statusFilter,
      }),
  });

  // pagination functions
  async function handleOnSetPage(page) {
    setPage(page);
  }

  if (isLoading) {
    return <p className='text-center text-4xl'>Getting your games...</p>;
  }

  if (!isLoading && data.count == 0) {
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
