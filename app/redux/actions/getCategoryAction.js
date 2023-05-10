/* eslint-disable no-unused-vars */
export const saveCategoryData = data => async dispatch => {
    dispatch({type: 'STORING_CATEGORY_DATA', payload: data});
  };

  