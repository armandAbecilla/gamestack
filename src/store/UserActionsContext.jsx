import { createContext, useState } from 'react';

// this context will hold the current user's action, that we can use track them globally for showing modals, etc.
const UserActionsContext = createContext({
  action: '', // could be "Add", "View", "Edit"
  showAdd: () => {},
  hideAdd: () => {},
});

export function UserActionsContextProvider({ children }) {
  const [userAction, setUserAction] = useState('');

  function showAdd() {
    setUserAction('add');
  }

  function hideAdd() {
    setUserAction('');
  }

  const ctxValue = {
    action: userAction,
    showAdd,
    hideAdd,
  };

  return (
    <UserActionsContext.Provider value={ctxValue}>
      {children}
    </UserActionsContext.Provider>
  );
}

export default UserActionsContext;
