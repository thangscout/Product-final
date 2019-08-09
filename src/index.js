import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import STORE from './stores';

import { refreshApp } from './actions/user';

refreshApp();
ReactDOM.render(
  <Provider store={STORE}>
    <App />
  </Provider>, document.getElementById('root'));

serviceWorker.unregister();
