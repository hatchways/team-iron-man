import React from 'react';

import { Redirect } from 'react-router-dom';
import { useUserState } from '../ContextProvider/user';
import LogIn from './LogIn';

// Redirects cliet to either login or home route
const LandingPage = ({ status }) => {
  const { isLoggedIn } = useUserState();
  return isLoggedIn ? <Redirect to="/home" /> : <LogIn />;
};

export default LandingPage;
