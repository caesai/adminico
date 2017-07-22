import rootReducer from '../reducers/';
import routes from '../routes';
import {reduxReactRouter} from 'redux-router';
import {applyMiddleware, compose, createStore} from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import createHistory from 'history/lib/createBrowserHistory';

export default function configureStore(history, initialState){
  let middleware = applyMiddleware(thunk, promise);

  let createStoreWithMiddleware = compose(
    middleware,
    reduxReactRouter({routes, createHistory}),
      window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  const store = createStoreWithMiddleware(createStore)(rootReducer, initialState);
  if (module.hot) {
    module.hot
      .accept('../reducers', () => {
          const nextRootReducer = require('../reducers/index');
          store.replaceReducer(nextRootReducer);
      });
  }

  return store;
}
