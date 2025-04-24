import { act, useContext } from 'react';
import Modal from '../components/UI/Modal';
import Badge from './UI/Badge';
import PlatformIcon from './UI/PlatformIcon';
import UserActionsContext from '../store/UserActionsContext';
import GamesContext from '../store/GamesContext';

export default function ViewGameModal() {
  const { action, hideGameDetailView } = useContext(UserActionsContext);
  const { selectedGameData } = useContext(GamesContext);

  function handleClose() {
    hideGameDetailView();
  }

  return (
    <Modal
      className='m-auto max-w-full!' // set the max width
      onClose={handleClose}
      dialogInnerClassName='p-0!' // remove the dialog inner padding
      closeOnClickOutside
      open={action === 'view' && selectedGameData}
    >
      {selectedGameData && (
        <div className='flex flex-col'>
          <div className='relative'>
            {/* <img
              src={selectedGameData.details.background_image}
              alt={selectedGameData.details.name}
              className='aspect-square h-full max-h-[400px] min-h-[350px] object-cover'
            /> */}
            <img
              src={selectedGameData.details.background_image}
              alt={selectedGameData.details.name}
              className='aspect-video h-full max-h-[600px] min-h-[350px] w-full'
            />
            {/* <PlatformIcon
              classNames='absolute top-2 right-2'
              platform={selectedGameData.platform}
            /> */}
          </div>
          <div className='flex w-full flex-col gap-4 p-5'>
            <div className='flex items-center gap-4'>
              <h3 className='font-heading text-3xl text-white'>
                {selectedGameData.details.name}
              </h3>
              <Badge status={selectedGameData.status} />
            </div>

            <div
              className='view-game-modal-description text-stone-200'
              dangerouslySetInnerHTML={{ __html: selectedGameData.description }}
            />

            <div className='mt-auto'>
              <h4 className='font-heading mb-2 text-xl text-stone-300'>
                Your Notes:
              </h4>
              <p className='text-stone-200'>{selectedGameData.notes}</p>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
