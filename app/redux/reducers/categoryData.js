const initialState = {
    data: {},

  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'STORING_CATEGORY_DATA':
        return {
          ...state,
          data: action.payload,
        };
      
      default:
        return state;
    }
  };
  