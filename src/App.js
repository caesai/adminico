import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import configureStore from './store/configureStore';

import LoginView from './views/LoginView';

const store = configureStore(browserHistory, window.__INITIAL_STATE__);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <LoginView />
      </Provider>
    )
  }
}
