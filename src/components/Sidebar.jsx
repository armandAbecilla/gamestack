import Button from './UI/Button';
export default function Sidebar({ onStatusSelect }) {
  function handleStatusSelect(status) {
    onStatusSelect(status);
  }

  return (
    <div className='flex flex-col'>
      <h4 className='font-heading mb-4'>Filter by Status</h4>
      <div className='flex w-full flex-col gap-2'>
        <Button
          onClick={() => handleStatusSelect('')}
          className='rounded-full! bg-stone-400! text-black hover:bg-stone-400/90!'
        >
          All
        </Button>
        <Button
          onClick={() => handleStatusSelect('playing')}
          className='bg-playing! hover:bg-playing/90! rounded-full! text-black'
        >
          Playing
        </Button>
        <Button
          onClick={() => handleStatusSelect('completed')}
          className='bg-darkgreen! hover:bg-darkgreen/90! rounded-full! text-white'
        >
          Completed
        </Button>
        <Button
          onClick={() => handleStatusSelect('backlog')}
          className='bg-backlog! hover:bg-backlog/90! rounded-full! text-white'
        >
          Backlog
        </Button>
        <Button
          onClick={() => handleStatusSelect('wishlist')}
          className='bg-wishlist! hover:bg-wishlist/90! rounded-full! text-stone-800'
        >
          Wishlist
        </Button>
      </div>
    </div>
  );
}
