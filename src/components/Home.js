import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Link } from 'react-router';
import { push } from 'redux-router';

const actions = {};

const mapStateToProps = (state) => ({
  isAuthenticating   : state.auth.isAuthenticating,
  statusText         : state.auth.statusText,
  location           : state.router.location
});

const mapDispatchToProps = (dispatch) => ( bindActionCreators( actionCreators, dispatch ) );

connect(
  mapStateToProps
)

export class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return(
      <div>
        You need to <Link to='/login'>log in</Link> to interact with an App.
      </div>
    )
  }
}
