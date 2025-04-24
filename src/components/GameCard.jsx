export default function GameCard({ image, name, onGameSelect }) {
  return (
    <div
      className='bg-black-100 border-black-50 relative cursor-pointer overflow-hidden rounded-lg border shadow'
      onClick={onGameSelect}
    >
      <img
        className='aspect-video h-[180px] object-cover'
        src={image}
        alt={name}
        title={name}
      />
      <div className='absolute bottom-0 w-full bg-[rgba(52,132,134,0.8)] px-2 py-2'>
        <h3 className='truncate text-center text-sm'>{name}</h3>
      </div>
    </div>
  );
}
