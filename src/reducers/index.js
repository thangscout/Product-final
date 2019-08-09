import { combineReducers } from 'redux';
import USERS from './users';
import CATEGORIES from './categories';

export default combineReducers({
  users: USERS,
  categories: CATEGORIES
});