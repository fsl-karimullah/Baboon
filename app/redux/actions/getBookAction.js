/* eslint-disable no-unused-vars */
export const saveBookData = data => async dispatch => {
  dispatch({type: 'STORING_BOOK_DATA', payload: data});
};
export const saveBookDetail = data => async dispatch => {
  dispatch({type: 'STORING_BOOK_DETAIL', payload: data});
};
