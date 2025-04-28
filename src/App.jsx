import UserGames from './components/UserGames';
import Header from './components/Header';
import AddGameModal from './components/AddGameModal';
import ViewGameModal from './components/ViewGameModal';
import EditNotesModal from './components/EditNotesModal';

function App() {
  return (
    <main className='container mx-auto px-5'>
      <Header />
      <UserGames />
      {/* Modals here */}
      <AddGameModal />
      <ViewGameModal />
      <EditNotesModal />
    </main>
  );
}

export default App;
