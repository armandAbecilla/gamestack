import { createContext, useEffect, useReducer, useCallback } from 'react';
import useHttp from '../hooks/useHttp';

const GamesContext = createContext({
  games: [],
  selectedGameData: {},
  isGamesFetching: false,
  refetchGames: () => {},
  setLoadedGames: () => {},
  addGame: (gameData) => {},
  removeGame: (gameId) => {},
  setSelectedGame: (gameId) => {},
});

function gamesReducer(state, action) {
  // for initial data for games list
  if (action.type === 'SET_ITEMS') {
    return {
      ...state, // return other states kahit items lang naman meron tayo
      items: action.payload.items,
    };
  }

  if (action.type === 'ADD_ITEM') {
    const items = [...state.items];
    items.unshift(action.payload.data);

    return {
      ...state,
      items: items,
    };
  }

  if (action.type === 'SET_SELECTED_GAME') {
    return {
      ...state,
      selectedGameData: action.payload.data,
    };
  }
}

const config = {};

// !What is happening here
/**
 * We used useEffect to set the initial value for items using dispatch, the data was fetched via our customHttp hook
 * We included the reference to isGamesFetching that also reference isLoading from useHttp hook
 * Also included reference to sendRequest from useHttp hook by including refetchGames as well in the context value
 */

export function GamesContextProvider({ children }) {
  const [game, dispatchGameAction] = useReducer(gamesReducer, {
    items: [],
    selectedGameData: null,
  });

  // lets fetch and set the items state so that we can use it on any other components already
  const {
    data: fetchedGames,
    isLoading: isGamesFetching,
    sendRequest: refetchGames,
  } = useHttp('http://localhost:3000/games', config, []);

  useEffect(() => {
    if (fetchedGames.length > 0) {
      setLoadedGames(fetchedGames);
    }
  }, [fetchedGames]);

  function setLoadedGames(games) {
    dispatchGameAction({
      type: 'SET_ITEMS',
      payload: {
        items: games,
      },
    });
  }

  // This is actually unused since we decided to re-fetch the data because we are also fetching data from external API in the backend for the game images
  function addGame(gameData) {
    dispatchGameAction({
      type: 'ADD_ITEM',
      payload: {
        data: gameData,
      },
    });
  }

  function setSelectedGame(gameData) {
    dispatchGameAction({
      type: 'SET_SELECTED_GAME',
      payload: {
        data: gameData,
      },
    });
  }

  const ctxValue = {
    games: game.items,
    selectedGameData: game.selectedGameData,
    isGamesFetching,
    refetchGames,
    setLoadedGames,
    addGame,
    // removeGame,
    setSelectedGame,
  };
  return (
    <GamesContext.Provider value={ctxValue}>{children}</GamesContext.Provider>
  );
}

export default GamesContext;
