import { Outlet } from 'react-router-dom';
import Header from '../Header';
import AddGameModal from '../AddGameModal';
import EditNoteModal from '../EditNotesModal';

export default function DefaultLayout() {
  return (
    <div className='container mx-auto px-5'>
      <Header />
      <main>
        <Outlet />
      </main>
      <AddGameModal />
      <EditNoteModal />
    </div>
  );
}
