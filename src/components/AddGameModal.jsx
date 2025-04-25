import { projectConfig } from '../config';
import { useActionState, useContext } from 'react';
import Modal from '../components/UI/Modal';
import Button from './UI/Button';
import Input from './UI/Input';
import Select from './UI/Select';
import UserActionsContext from '../store/UserActionsContext';
import useHttp from '../hooks/useHttp';
import GamesContext from '../store/GamesContext';
import FancySelect from './UI/FancySelect';

const platformOptions = [
  { label: 'PC', value: 'pc' },
  { label: 'XBox', value: 'xbox' },
  { label: 'Playstation', value: 'playstation' },
  { label: 'Nintendo Switch', value: 'nintendo switch' },
];

const statusOptions = [
  { label: 'Playing', value: 'playing' },
  { label: 'Backlog', value: 'backlog' },
  { label: 'Completed', value: 'completed' },
  { label: 'Wishlist', value: 'wishlist' },
];

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function AddGameModal() {
  const { action, hideAdd } = useContext(UserActionsContext);
  const { sendRequest } = useHttp('', requestConfig, {});
  const [state, addFormAction, isFormSubmitting] = useActionState(addAction);
  const { refetchGames, addGame, games } = useContext(GamesContext);

  function handleClose() {
    hideAdd();
  }

  async function addAction(prevForm, formData) {
    const addGameData = Object.fromEntries(formData.entries());

    const newGameData = await sendRequest(
      `${projectConfig.API_URL}/games/add`,
      JSON.stringify({
        gameData: addGameData,
      }),
    );

    // refetchGames(); // if we want the re-fetch approach

    if (newGameData?.data) {
      addGame(newGameData.data); // optimistic update
    }

    handleClose();
  }

  return (
    <Modal className='m-auto' open={action === 'add'} onClose={handleClose}>
      <h2 className='text-darkgreen font-heading mb-4 text-3xl font-bold'>
        Add a new Game
      </h2>
      <form action={addFormAction} className='flex flex-col gap-5'>
        <Input id='name' type='text' placeholder='Game Name' required />
        <div className='flex gap-4'>
          <Select
            id='platform'
            options={platformOptions}
            defaultPlaceholder='Select Platform'
            defaultValue='' // set to empty to display defaultPlaceholder text
            required
          />
          <Select
            id='status'
            options={statusOptions}
            defaultPlaceholder='Status'
            defaultValue=''
            required
          />
        </div>
        <Input textarea id='notes' placeholder='Notes' rows='5' />

        <div className='flex items-center justify-end gap-5'>
          <Button
            textOnly
            type='button'
            className='text-white! hover:text-stone-100!'
            onClick={handleClose}
            disabled={isFormSubmitting}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={isFormSubmitting}>
            {isFormSubmitting ? 'Saving...' : 'Add'}{' '}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
