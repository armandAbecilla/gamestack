// components
import Modal from '../components/UI/Modal';
import PlatformIcon from './UI/PlatformIcon';
import FancySelect from './UI/FancySelect';

// react hooks
import { useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/userActions';

// assets and static data
import editIcon from '../assets/edit.png';
import { statusOptions } from '../data/dropdowns';

import { updateUserGameData } from '../store/games-actions';

export default function ViewGameModal() {
  const selectedGameData = useSelector((state) => state.games.selectedGameData);
  const userAction = useSelector((state) => state.userActions.action);
  const [status, setStatus] = useState();
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(userActions.resetAction());
  }

  async function handleStatusChange(value) {
    const id = selectedGameData.id;
    const updatedData = {
      ...selectedGameData,
      status: value,
    };

    dispatch(
      updateUserGameData({
        id: id,
        gameData: updatedData,
      }),
    );

    setStatus(value);
  }

  function handleEdit() {
    dispatch(userActions.resetAction());

    dispatch(userActions.showEditNote());
  }

  return (
    <Modal
      className='m-auto max-w-[1536px]!' // set the max width
      onClose={handleClose}
      modalInnerClassName='p-0!' // remove the dialog inner padding
      closeOnClickOutside
      open={userAction === 'view' && selectedGameData}
    >
      {selectedGameData && (
        <div className='flex flex-col'>
          <div className='relative'>
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
            <div className='flex flex-col gap-4 xl:flex-row xl:items-center'>
              <h3 className='font-heading order-1 text-3xl text-white xl:order-0'>
                {selectedGameData.details.name}
              </h3>
              <FancySelect
                className='order-0 xl:order-1'
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
              <h4 className='font-heading mb-2 flex items-center text-xl text-stone-300'>
                Your Notes
                <img
                  className='ml-2 aspect-square h-6 cursor-pointer'
                  src={editIcon}
                  alt='pencil'
                  onClick={handleEdit}
                />
              </h4>
              <p className='whitespace-pre-wrap text-stone-200'>
                {selectedGameData.notes}
              </p>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
