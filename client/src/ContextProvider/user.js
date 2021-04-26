import React, { createContext, useReducer, useContext } from 'react';
import { authUser } from './actions';
import UserReducer from './reducer';

const UserStateContext = createContext();
const UserDispatchContext = createContext();

const useUserState = () => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }

  return context;
};

const useUserDispatch = () => {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }

  return context;
};

// Add additional states here that need to be accessed by multiple pages/components
const initialState = {
  isLoggedIn: false,
  user: '',
  error: '',
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    authUser(dispatch);
  }, []);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export { useUserState, useUserDispatch, UserProvider };
