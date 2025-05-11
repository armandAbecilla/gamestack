import Button from './UI/Button';
import { fetchUserGames } from '../store/games-actions';
import { useDispatch, useSelector } from 'react-redux';
export default function Sidebar() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  function handleFilteredSearch(status) {
    dispatch(
      fetchUserGames({
        userId: auth.user.id,
        status: status,
      }),
    );
  }
  return (
    <div className='flex flex-col'>
      <h4 className='font-heading mb-4'>Filter by Status</h4>
      <div className='flex w-full flex-col gap-2'>
        <Button
          onClick={() => handleFilteredSearch('playing')}
          className='bg-playing! hover:bg-playing/90! rounded-full! text-black'
        >
          Playing
        </Button>
        <Button
          onClick={() => handleFilteredSearch('completed')}
          className='bg-darkgreen! hover:bg-darkgreen/90! rounded-full! text-white'
        >
          Completed
        </Button>
        <Button
          onClick={() => handleFilteredSearch('backlog')}
          className='bg-backlog! hover:bg-backlog/90! rounded-full! text-white'
        >
          Backlog
        </Button>
        <Button
          onClick={() => handleFilteredSearch('wishlist')}
          className='bg-wishlist! hover:bg-wishlist/90! rounded-full! text-stone-800'
        >
          Wishlist
        </Button>
      </div>
    </div>
  );
}
