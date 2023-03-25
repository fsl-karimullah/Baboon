import {combineReducers} from 'redux';
import bookData from './bookData';
import userData from './userData';
const rootReducer = combineReducers({
  bookData,
  userData,
});

export default rootReducer;
