// change this if the server address/port changes
const ROOT_URL = 'http://localhost:3001';

const registerUser = async (dispatch, loginPayload) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: loginPayload.registerEmail,
      name: loginPayload.registerName,
      password: loginPayload.registerPassword,
      confirmPassword: loginPayload.confirmPassword,
    }),
  };

  try {
    const response = await fetch(`${ROOT_URL}/api/signup`, requestOptions);
    const data = await response.json();
    if (response.status === 201) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.name });
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
    const response = await fetch(`${ROOT_URL}/login`, requestOptions);
    const data = await response.json();
    if (response.status === 200) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.name });
      return data;
    } else {
      throw data.message;
    }
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILED', payload: error });
    throw error;
  }
};

export { loginUser, registerUser };
