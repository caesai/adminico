import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  isStronglyAuthenticated    : state.auth.isStronglyAuthenticated,
  isAuthenticated    : state.auth.isAuthenticated,
  isAuthenticating   : state.auth.isAuthenticating,
  statusText         : state.auth.statusText,
  location           : state.router.location
});

connect(
     mapStateToProps
)

export class Main extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        {this.props.children ? <div>{this.props.children}</div> : ''}
      </div>
    )
  }
}
