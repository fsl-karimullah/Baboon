// const initialState = {
//   data: {},
//   danaData: {},
//   danaPaymentData: {},
// };

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case 'RESET_USERDATA':
//       return {
//         ...state,
//         data: {},
//       };
//     case 'STORING_USERDATA':
//       return {
//         ...state,
//         data: {
//           ...state.data,
//           ...action.payload
//         },
//       };
//     case 'STORING_DANA_DATA':
//       return {
//         ...state,
//         danaData: action.payload,
//       };
//     case 'STORING_DANA_PAYMENT_DATA':
//       return {
//         ...state,
//         danaPaymentData: action.payload,
//       };
//     default:
//       return state;
//   }
// };
