const initialState = {
  data: {},
  dataDetail: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'STORING_BOOK_DATA':
      return {
        ...state,
        data: action.payload,
      };
    case 'STORING_BOOK_DETAIL':
      return {
        ...state,
        dataDetail: action.payload,
      };
    default:
      return state;
  }
};
