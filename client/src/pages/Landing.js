import React from 'react';

import { Redirect } from 'react-router-dom';

// Redirects cliet to either login or home route
const LandingPage = ({ status }) => {
  return status ? <Redirect to="/home" /> : <Redirect to="/login" />;
};

export default LandingPage;
