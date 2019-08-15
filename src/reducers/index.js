import { combineReducers } from 'redux';
import USERS from './users';
import CATEGORIES from './categories';
import PRODUCTS from './products';
import CARTS from './carts';

export default combineReducers({
  users: USERS,
  categories: CATEGORIES,
  products: PRODUCTS,
  carts: CARTS
});