import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  isStronglyAuthenticated    : state.auth.isStronglyAuthenticated,
  isAuthenticated    : state.auth.isAuthenticated,
  isAuthenticating   : state.auth.isAuthenticating,
  statusText         : state.auth.statusText,
  location           : state.router.location
});

class MainView extends React.Component {
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

MainView = connect(mapStateToProps)(MainView);

export default MainView;
