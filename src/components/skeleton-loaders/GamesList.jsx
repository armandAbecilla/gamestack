import Skeleton from 'react-loading-skeleton';
export default function GamesListSkeleton() {
  return (
    <div className='grid grid-cols-2 gap-4 xl:grid-cols-4'>
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index}>
          <Skeleton
            height={155}
            count={1}
            baseColor='#1b1b1b'
            highlightColor='#444'
          />
        </div>
      ))}
    </div>
  );
}
