const initialState = {
  data: {},
  //   danaData: {},
  //   danaPaymentData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_USERDATA':
      return {
        ...state,
        data: {},
      };
    case 'STORING_USERDATA':
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
