/* eslint-disable no-unused-vars */
export const savePaymentData = data => async dispatch => {
    dispatch({type: 'STORING_PAYMENT_DATA', payload: data});
  };
  export const savePaymentDetail = data => async dispatch => {
    dispatch({type: 'STORING_PAYMENT_DETAIL', payload: data});
  };
  