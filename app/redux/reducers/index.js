import {combineReducers} from 'redux';
import bookData from './bookData';
import userData from './userData';
import bookmarkData from './bookmarkData';
import paymentData from './paymentData'
import categoryData from './categoryData';
const rootReducer = combineReducers({
  bookData,
  userData,
  bookmarkData,
  paymentData,
  categoryData
});

export default rootReducer;
