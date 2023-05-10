const initialState = {
    data: {},
    dataDetail: {},
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'STORING_PAYMENT_DATA':
        return {
          ...state,
          data: action.payload,
        };
      case 'STORING_PAYMENT_DETAIL':
        return {
          ...state,
          dataDetail: action.payload,
        };
      default:
        return state;
    }
  };
  