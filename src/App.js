import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducers from './reducers';

import LoginView from './views/LoginView';

let store = createStore(appReducers);

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
