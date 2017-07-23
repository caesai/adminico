import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';

const actions = {};

const mapStateToProps = (state) => ({
  isAuthenticating   : state.auth.isAuthenticating,
  statusText         : state.auth.statusText,
  location           : state.router.location
});

class Home extends React.Component {
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

Home = connect(
  mapStateToProps
)(Home);

export default Home;
