const UserReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload[0],
        email: action.payload[1]
      };
    case 'LOGIN_FAILED':
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error(`Unhandled action tpye: ${action.type}`);
  }
};

export default UserReducer;
