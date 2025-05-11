import Skeleton from 'react-loading-skeleton';

export default function GameDetailsSkeleton() {
  return (
    <div>
      <div className='flex gap-5'>
        <Skeleton
          height={700}
          width={600}
          baseColor='#1b1b1b'
          highlightColor='#444'
        />
        <div className='flex flex-col gap-4'>
          <Skeleton
            count={4}
            height={20}
            width={600}
            baseColor='#1b1b1b'
            highlightColor='#444'
          />
          <Skeleton
            className='mt-4'
            count={4}
            height={20}
            width={600}
            baseColor='#1b1b1b'
            highlightColor='#444'
          />
        </div>
      </div>

      <div className='mt-4 border-t border-stone-700 pt-4'>
        <Skeleton
          height={40}
          width={600}
          baseColor='#1b1b1b'
          highlightColor='#444'
        />

        <div className='flex'>
          <div className='mt-4 basis-1/2'>
            <Skeleton
              count={8}
              height={20}
              baseColor='#1b1b1b'
              highlightColor='#444'
            />
          </div>

          <div className='mt-4 basis-1/2'>
            <Skeleton
              count={8}
              height={20}
              baseColor='#1b1b1b'
              highlightColor='#444'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
