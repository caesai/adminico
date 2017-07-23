import React from 'react';
import {checkHttpStatus, parseJSON} from '../utils';
import { push , replace } from 'redux-router';
import { connect } from 'react-redux';

import ledger from '../ledger/ledger.js';

const actions = {
  loginUserRequest: () => ({
      type: 'LOGIN_USER_REQUEST'
  }),
  walletLoginRequest: () => ({
      type: 'WALLET_LOGIN_REQUEST'
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
    this.walletLogIn = this.walletLogIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.closeModals = this.closeModals.bind(this);
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
  walletLogIn() {
    ledger.hasSession();
    this.refs.ledger.classList.toggle('active');
    this.refs.blackBg.classList.toggle('active');
  }
  closeModals() {
    this.refs.ledger.classList.toggle('active');
    this.refs.blackBg.classList.toggle('active');
  }
  componentDidMount(){
    let callback = (event) => {
      if (!event.response) return;
        if (!event.response.success) {
          this.props.dispatch(actions.loginUserFailure({
            response: {
              status: 403,
              statusText: 'Ledger Nano is not connected'
            }
          }));
        } else {
          this.props.dispatch(actions.loginUser('admin', 'admin', this.state.redirectTo));
          this.props.dispatch(replace('/profile'));
        }
    };
    ledger.init({ callback: callback });
  }
  render(){
    return(
      <div className="loginBlock">
        <h3>Please log in</h3>
        {this.props.statusText ? <div className='alert alert-info'>{this.props.statusText}</div> : ''}
        <form onSubmit={(e) => {
          e.preventDefault();
          this.signUp();
        }}>
          <input type="text" name="email" placeholder="Enter your login or email" onChange={this.handleInputChange} value={this.state.email} />
          <input type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} value={this.state.password} />
          <button type="submit">Sign up</button>
          <a href='#' onClick={(e) => {
            e.preventDefault();
            this.walletLogIn();
          }}>Sign me in with my Bitcoin address</a>
        </form>
        <div ref="ledger" className="ledgerModal">
          <p className="modalMessage"></p>
          {this.props.statusText ? <div className='alert alert-info'>{this.props.statusText}</div> : ''}
          <div className="closeBtn" onClick={this.closeModals}>X</div>
        </div>
        <div ref="blackBg" onClick={this.closeModals} className="blackBg"></div>
      </div>
    )
  }
}

LoginView = connect(
  mapStateToProps
)(LoginView);

export default LoginView;
