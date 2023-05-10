const initialState = {
  data: {},
  isLogin: false
  
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_USERDATA':
      return {
        ...state,
        data: {},
      };
    case 'STORING_USER_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
