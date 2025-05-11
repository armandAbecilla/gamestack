import GameDetailsSkeleton from './skeleton-loaders/GameDetails';
import Button from './UI/Button';

export default function GameDetails({
  gameData,
  isLoading,
  onAddToLibrary,
  onRemoveFromLibrary,
  userGameData,
}) {
  const platforms = gameData
    ? gameData.platforms.map((item, index) => (
        <span key={item.platform.id}>
          {item.platform.name}
          {index !== gameData.platforms.length - 1 ? ', ' : ''}
        </span>
      ))
    : [];

  const developers = gameData
    ? gameData.developers.map(
        (devs, index) =>
          `${devs.name}${index !== gameData.developers.length - 1 ? ', ' : ''}`,
      )
    : [];

  const pcPlatform = gameData
    ? gameData.platforms.find((item) => item.platform.name === 'PC')
    : null;

  // System Requirements
  const minimumRequirement = pcPlatform ? (
    <span className='mb-1 block whitespace-pre-line'>
      {pcPlatform?.requirements?.minimum ||
        'Minimum requirements not yet available'}
    </span>
  ) : undefined;
  const recommendedRequirement = pcPlatform ? (
    <span className='mb-1 block whitespace-pre-line'>
      {pcPlatform?.requirements?.recommended ||
        'Recommended requirements not yet available'}
    </span>
  ) : undefined;

  //  skeleton loader
  if (isLoading) {
    return <GameDetailsSkeleton />;
  }

  const onUserList = userGameData && !!userGameData;

  return (
    <>
      {gameData && !isLoading && (
        <div>
          <div className='flex gap-5'>
            <img
              className='aspect-auto h-[700px] max-w-[500px] object-cover'
              src={gameData.background_image}
            />
            <div className='flex flex-col gap-4'>
              <h1 className='font-heading text-5xl'>{gameData.name}</h1>
              <h4 className='text-stone-100'>
                Release date: {gameData.released}
              </h4>
              <div className='flex gap-2'>
                <h4 className='text-stone-100'>Available on:</h4>
                <p>{platforms}</p>
              </div>
              <span className='text-stone-100'>
                Metacritic Score: {gameData.metacritic || 'Not yet available'}
              </span>
              <span className='text-stone-100'>Developed by: {developers}</span>
              <h4 className='font-h mt-5 text-xl'>Description:</h4>
              <div
                className='flex flex-col gap-2 text-stone-300'
                dangerouslySetInnerHTML={{
                  __html: gameData.description,
                }}
              ></div>

              {/* user options */}
              <div className='mt-4'>
                {!onUserList ? (
                  <Button onClick={onAddToLibrary}>Add to Library</Button>
                ) : (
                  <Button onClick={onRemoveFromLibrary}>
                    Remove from Library
                  </Button>
                )}
              </div>

              {/* <div>
                   <h5 className='text-lg text-stone-300'>Notes:</h5>
                   <p className='text-stone-300'>
                     Add this game to your list to start adding notes!
                   </p>
                 </div> */}
            </div>
          </div>

          <div className='mt-4 border-t border-stone-700 pt-4'>
            <h4 className='text-xl text-stone-200'>PC System Requirements</h4>

            <div className='flex gap-15'>
              <div className='mt-4 basis-1/2'>{minimumRequirement}</div>
              <div className='mt-4 basis-1/2'>{recommendedRequirement}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
