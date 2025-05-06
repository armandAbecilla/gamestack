import { projectConfig } from '../config';

// components
import Modal from './UI/Modal';
import Input from './UI/Input';
import Button from './UI/Button';

// react hooks
import { useActionState, useEffect, useState } from 'react';

// custom hooks
import useHttp from '../hooks/useHttp';

// redux
import { gamesActions } from '../store/games';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/userActions';

const requestConfig = {
  method: 'PATCH', // patch since we are updating only partially
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function EditNotesModal() {
  const selectedGameData = useSelector((state) => state.games.selectedGameData);
  const userAction = useSelector((state) => state.userActions.action);
  const [notes, setNotes] = useState('');
  const { sendRequest } = useHttp('', requestConfig);
  const [state, editNoteFormAction, isFormSubmitting] =
    useActionState(editNoteAction);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedGameData) {
      setNotes(selectedGameData.notes);
    }
  }, [selectedGameData]);

  async function editNoteAction(prevFormState, formData) {
    console.log(formData);
    console.log('submitting');

    const updateNote = formData.get('notes');

    const updatedGameData = {
      ...selectedGameData,
      notes: updateNote,
    };

    await sendRequest(
      `${projectConfig.API_URL}/games/${selectedGameData.id}`,
      JSON.stringify(updatedGameData),
    );

    // update the current data
    dispatch(gamesActions.setSelectedGame(updatedGameData));
    handleClose();
  }

  function handleNotesChange(e) {
    setNotes(e.target.value);
  }

  function handleClose() {
    dispatch(userActions.resetAction()); // close the modal first
    dispatch(userActions.showGameDetailView());
  }

  return (
    <Modal
      className='m-auto max-w-lg' // set the max width
      onClose={handleClose}
      open={userAction === 'editNote' && selectedGameData}
    >
      <h4 className='font-heading mb-4 flex items-center text-xl text-stone-300'>
        Update Notes
      </h4>
      <form action={editNoteFormAction}>
        <Input
          id='notes'
          textarea
          value={notes}
          onChange={handleNotesChange}
          className='rounded-sm bg-white/95 text-lg'
          rows='10'
          placeholder={`Write your thoughts about ${selectedGameData?.details?.name}...`}
          disabled={isFormSubmitting}
        />
        <div className='mt-4 flex justify-end gap-5'>
          <Button
            textOnly
            type='button'
            className='text-white! hover:text-stone-100!'
            onClick={handleClose}
            disabled={isFormSubmitting}
          >
            Cancel
          </Button>
          <Button type='submit' className='button' disabled={isFormSubmitting}>
            {isFormSubmitting ? 'Saving...' : 'Update'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
