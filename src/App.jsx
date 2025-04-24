import GameList from './components/GameList';
import Header from './components/Header';
import AddGameModal from './components/AddGameModal';
import ViewGameModal from './components/ViewGameModal';
import { GamesContextProvider } from './store/GamesContext';
import { UserActionsContextProvider } from './store/UserActionsContext';
function App() {
  return (
    <div className='container mx-auto'>
      <UserActionsContextProvider>
        <GamesContextProvider>
          <Header />
          <GameList />

          {/* Modals here */}
          <AddGameModal />
          <ViewGameModal />
        </GamesContextProvider>
      </UserActionsContextProvider>
    </div>
  );
}

export default App;
