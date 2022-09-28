/* eslint-disable no-unused-vars */
export const saveUserData = data => async dispatch => {
  dispatch({type: 'STORING_USER_DATA', payload: data});
};
export const resetUserData = data => async dispatch => {
  dispatch({type: 'RESET_USERDATA', payload: data});
};
