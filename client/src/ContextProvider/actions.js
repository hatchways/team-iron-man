const registerUser = async (dispatch, registerPayload) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: registerPayload.registerEmail,
      name: registerPayload.registerName,
      password: registerPayload.registerPassword,
      confirmPassword: registerPayload.confirmPassword,
    }),
  };

  try {
    const response = await fetch(`/api/signup`, requestOptions);
    const data = await response.json();
    if (response.status === 201) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: [data.avatar, data.name, data.email] });
      return data;
    } else {
      throw data.message;
    }
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILED', payload: error });
    throw error;
  }
};

const loginUser = async (dispatch, loginPayload) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: loginPayload.signInEmail,
      password: loginPayload.signInPassword,
    }),
  };

  try {
    const response = await fetch(`/api/login`, requestOptions);
    const data = await response.json();
    if (response.status === 200) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: [data.avatar, data.name, data.email] });
      return data;
    } else {
      throw data.message;
    }
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILED', payload: error });
    throw error;
  }
};

const authUser = async (dispatch) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  try {
    const response = await fetch('/api/authLogin', requestOptions);
    const data = await response.json();
    if (response.status === 200) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: [data.avatar, data.name, data.email] });
      return data;
    } else {
      throw data.message;
    }
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILED', payload: error });
    throw error;
  }
};

export { loginUser, registerUser, authUser };
