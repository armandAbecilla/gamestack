import { useContext, useState } from 'react';
import Modal from '../components/UI/Modal';
import PlatformIcon from './UI/PlatformIcon';
import UserActionsContext from '../store/UserActionsContext';
import GamesContext from '../store/GamesContext';
import FancySelect from './UI/FancySelect';
import { statusOptions } from '../data/dropdowns';
import { projectConfig } from '../config';
import useHttp from '../hooks/useHttp';

const requestConfig = {
  method: 'PATCH', // patch since we are updating only partially
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function ViewGameModal() {
  const { action, hideGameDetailView } = useContext(UserActionsContext);
  const { selectedGameData } = useContext(GamesContext);
  const [status, setStatus] = useState();
  const { sendRequest, isLoading } = useHttp('', requestConfig);

  function handleClose() {
    hideGameDetailView();
  }

  async function handleStatusChange(value) {
    const id = selectedGameData.id;
    const updatedData = JSON.stringify({
      ...selectedGameData,
      status: value,
    });

    await sendRequest(`${projectConfig.API_URL}/games/${id}`, updatedData);

    setStatus(value);
  }

  return (
    <Modal
      className='m-auto max-w-[1536px]!' // set the max width
      onClose={handleClose}
      modalInnerClassName='p-0!' // remove the dialog inner padding
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
              className='aspect-video h-full min-h-[350px] w-full object-cover'
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
              <FancySelect
                options={statusOptions}
                defaultValue={selectedGameData.status}
                onChange={handleStatusChange}
                value={status}
              />
            </div>

            <div className='flex flex-col'>
              <div
                className={`view-game-modal-description text-stone-200`}
                dangerouslySetInnerHTML={{
                  __html: selectedGameData.description,
                }}
              />
            </div>

            <div className='mt-10'>
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
