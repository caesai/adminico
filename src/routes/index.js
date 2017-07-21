import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../App';
import Profile from '../components/Profile';

export default(
  <Route path='/' component={App}>
    <IndexRoute component={Profile} />
  </Route>
);
