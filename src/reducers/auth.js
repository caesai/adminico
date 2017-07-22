import {createReducer} from '../utils';

const initialState = {
  isAuthenticated: false
};

export default createReducer (initialState, {
    ['LOGIN_USER_REQUEST']: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': true,
            'statusText': null
        });
      }
    }
);
