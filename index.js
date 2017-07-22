import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import configureStore from './src/store/configureStore';

const store = configureStore(browserHistory, window.__INITIAL_STATE__);

const node = (
  <App store={store} />
);

import App from './src/App';

ReactDOM.render(
  node,
  document.getElementById('app')
);
