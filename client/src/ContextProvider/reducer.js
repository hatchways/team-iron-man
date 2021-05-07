const UserReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        avatar: action.payload[0],
        user: action.payload[1],
        email: action.payload[2],
      };
    case 'LOGIN_FAILED':
      return {
        ...state,
        error: action.payload,
      };
    case 'RESET_STATE':
      return {
        ...state,
        isLoggedIn: false,
        _id: '',
        user: '',
        email: '',
        error: '',
      };
    default:
      throw new Error(`Unhandled action tpye: ${action.type}`);
  }
};

export default UserReducer;
