/* eslint-disable no-unused-vars */
export const saveBookmarkData = data => async dispatch => {
    dispatch({type: 'STORING_BOOKMARK_DATA', payload: data});
  };
  export const saveBookmarkDetail = data => async dispatch => {
    dispatch({type: 'STORING_BOOKMARK_DETAIL', payload: data});
  };
  