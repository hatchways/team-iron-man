import React from 'react';

import { Redirect } from 'react-router-dom';

// Redirects cliet to either sign in or home route
const LandingPage = ({ status }) => {
  return status ? <Redirect to="/home" /> : <Redirect to="/signin" />;
};

export default LandingPage;
