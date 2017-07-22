import React from 'react';
import {Route, IndexRoute} from 'react-router';

// import App from '../App';
import {MainView, LoginView} from '../views';
import {Home} from '../components/Home';
import {Profile} from '../components/Profile';

export default(
  <Route path='/' component={MainView}>
    <IndexRoute component={Home} />
    <Route path='/login' component={LoginView} />
    <Route path='/profile' component={Profile} />
  </Route>
);
