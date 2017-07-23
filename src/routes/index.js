import React from 'react';
import {Route, IndexRoute} from 'react-router';

import {requireAuthentication} from '../components/AuthenticatedComponent';
// import App from '../App';
import MainView from '../views';
import LoginView from '../views/LoginView'
import Home from '../components/Home';
import Profile from '../components/Profile';

export default(
  <Route path='/' component={MainView}>
    <IndexRoute component={Home} />
    <Route path='/login' component={LoginView} />
    <Route path='/profile' component={requireAuthentication(Profile)} />
  </Route>
);
