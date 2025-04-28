import GameList from './components/GameList';
import Header from './components/Header';
import AddGameModal from './components/AddGameModal';
import ViewGameModal from './components/ViewGameModal';
import EditNotesModal from './components/EditNotesModal';
// import Stats from './components/Stats';
function App() {
  return (
    <main className='container mx-auto px-5'>
      <Header />
      <GameList />
      {/* Modals here */}
      <AddGameModal />
      <ViewGameModal />
      <EditNotesModal />
    </main>
  );
}

export default App;
