import AddGameModal from './components/AddGameModal';
import GameList from './components/GameList';
import Header from './components/Header';
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
        </GamesContextProvider>
      </UserActionsContextProvider>
    </div>
  );
}

export default App;
