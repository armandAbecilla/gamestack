import Button from './ui/Button';
export default function Sidebar() {
  return (
    <div className='flex flex-col'>
      <h4 className='font-heading mb-4'>Filter by Status</h4>
      <div className='flex w-full flex-col gap-2'>
        <Button className='bg-playing! hover:bg-playing/90! rounded-full! text-black'>
          Playing
        </Button>
        <Button className='bg-darkgreen! hover:bg-darkgreen/90! rounded-full! text-white'>
          Completed
        </Button>
        <Button className='bg-backlog! hover:bg-backlog/90! rounded-full! text-white'>
          Backlog
        </Button>
        <Button className='bg-wishlist! hover:bg-wishlist/90! rounded-full! text-stone-800'>
          Wishlist
        </Button>
      </div>
    </div>
  );
}
