import React from 'react';
import { Provider } from 'react-redux';
import routes from './routes';
import {ReduxRouter} from 'redux-router';
import './scss/LoginView.scss';

export default class App extends React.Component {
  static get propTypes() {
    return {
      store: React.PropTypes.object.isRequired
    }
  }
  render() {
    return (
      <Provider store={this.props.store}>
        <ReduxRouter>
            {routes}
        </ReduxRouter>
      </Provider>
    )
  }
}
