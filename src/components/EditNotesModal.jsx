import { useActionState, useContext, useEffect, useState } from 'react';
import GamesContext from '../store/GamesContext';
import Modal from './UI/Modal';
import Input from './UI/Input';
import Button from './UI/Button';
import UserActionsContext from '../store/UserActionsContext';
import useHttp from '../hooks/useHttp';
import { projectConfig } from '../config';

const requestConfig = {
  method: 'PATCH', // patch since we are updating only partially
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function EditNotesModal() {
  const { action, hideEditNote, showGameDetailView } =
    useContext(UserActionsContext);

  const { selectedGameData, setSelectedGame } = useContext(GamesContext);
  const [notes, setNotes] = useState('');
  const { sendRequest } = useHttp('', requestConfig);
  const [state, editNoteFormAction, isFormSubmitting] =
    useActionState(editNoteAction);

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
    setSelectedGame(updatedGameData);
    handleClose();
  }

  function handleNotesChange(e) {
    setNotes(e.target.value);
  }

  function handleClose() {
    hideEditNote();
    showGameDetailView();
  }

  return (
    <Modal
      className='m-auto max-w-lg' // set the max width
      onClose={handleClose}
      open={action === 'editNote' && selectedGameData}
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
