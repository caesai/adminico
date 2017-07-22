import React from 'react';
import {checkHttpStatus, parseJSON} from '../utils';
import { push , replace } from 'redux-router';
import { connect } from 'react-redux';

const actions = {
  loginUserRequest: () => ({
      type: 'LOGIN_USER_REQUEST'
  }),
  loginUser: (email, password, redirect='/') => (dispatch) => {
    dispatch(actions.loginUserRequest());
    return fetch('http://localhost:3000/login', {
      method: 'post',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
          body: JSON.stringify({email: email, password: password})
      })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      try {
        if (response.access == 'granted') {
          dispatch(actions.loginUserSuccess(response.token));
          dispatch(push({
            pathname: '/profile',
            query: { status: 'refresh' }
          }));
        } else {
          dispatch(actions.loginUserFailure({
            response: {
              status: 403,
              statusText: 'Credentials check failed'
            }
          }));
        }
      } catch (e) {
        dispatch(actions.loginUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid token'
          }
        }));
      }
    })
    .catch(error => {
        dispatch(actions.loginUserFailure({
          response: {
            status: 403,
            statusText: 'Credentials check failed'
          }
        }));
    });
  },
  loginUserSuccess: (token) => {
    // console.log(token);
    return {
      type: 'LOGIN_USER_SUCCESS',
      payload: {
        token: token
      }
    }
  },
  loginUserFailure: (error) => {
    localStorage.removeItem('token');
    return ({
      type: 'LOGIN_USER_FAILURE',
      payload: {
        status: error.response.status,
        statusText: error.response.statusText
      }
    })
  }
}

const mapStateToProps = (state) => ({
  isAuthenticating   : state.auth.isAuthenticating,
  statusText         : state.auth.statusText,
  location: state.router.location
});



class LoginView extends React.Component {
  constructor(props) {
    super(props);
    const redirectRoute = this.props.location.query.next || '/login';
    this.state = {
      email: '',
      password: '',
      redirectTo: redirectRoute
    };
    this.signUp = this.signUp.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  signUp(){
    this.props.dispatch(actions.loginUser(this.state.email, this.state.password, this.state.redirectTo));
    this.props.dispatch(replace('/profile'));
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  componentDidMount(){
    console.log(this.props);
  }
  render(){
    return(
      <div className="loginBlock">
        <h3>Please log in</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.signUp();
        }}>
          <input type="text" name="email" placeholder="Enter your login or email" onChange={this.handleInputChange} value={this.state.email} />
          <input type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} value={this.state.password} />
          <button type="submit">Sign up</button>
        </form>
      </div>
    )
  }
}

LoginView = connect(
  mapStateToProps
)(LoginView);

export default LoginView;
