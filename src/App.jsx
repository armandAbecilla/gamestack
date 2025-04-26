import GameList from './components/GameList';
import Header from './components/Header';
import AddGameModal from './components/AddGameModal';
import ViewGameModal from './components/ViewGameModal';
import { GamesContextProvider } from './store/GamesContext';
import { UserActionsContextProvider } from './store/UserActionsContext';
import EditNotesModal from './components/EditNotesModal';
// import Stats from './components/Stats';
function App() {
  return (
    <main className='container mx-auto px-5'>
      <UserActionsContextProvider>
        <GamesContextProvider>
          <Header />
          {/* <Stats /> */}
          <GameList />
          {/* Modals here */}
          <AddGameModal />
          <ViewGameModal />
          <EditNotesModal />
        </GamesContextProvider>
      </UserActionsContextProvider>
    </main>
  );
}

export default App;
