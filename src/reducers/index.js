import { combineReducers } from 'redux';
import USERS from './users';
import CATEGORIES from './categories';
import PRODUCTS from './products';

export default combineReducers({
  users: USERS,
  categories: CATEGORIES,
  products: PRODUCTS
});