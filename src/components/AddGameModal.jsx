// components
import Modal from '../components/UI/Modal';
import Button from './UI/Button';
import Input from './UI/Input';
import Select from './UI/Select';

// react hooks
import { useActionState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { gamesActions } from '../store/games';
import { userActions } from '../store/userActions';
import { addGame } from '../store/games-actions';

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

export default function AddGameModal() {
  const userAction = useSelector((state) => state.userActions.action);
  const [state, addFormAction, isFormSubmitting] = useActionState(addAction);
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(userActions.resetAction());
  }

  async function addAction(prevForm, formData) {
    const addGameData = Object.fromEntries(formData.entries());
    const response = await dispatch(addGame(addGameData));
    const { data: newGameData } = response.payload;

    if (newGameData) {
      dispatch(gamesActions.addItem(newGameData)); // optimistic update
    }

    handleClose();
  }

  return (
    <Modal className='m-auto' open={userAction === 'add'} onClose={handleClose}>
      <h2 className='text-darkgreen font-heading mb-4 text-3xl font-bold'>
        Add a new Game
      </h2>
      <form action={addFormAction} className='flex flex-col gap-5'>
        <Input id='name' type='text' placeholder='Game Name' required />
        <div className='flex flex-col gap-4 xl:flex-row'>
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
