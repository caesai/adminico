import React from 'react';
import * as styles from '../scss/LoginView.scss';

export default class LoginView extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    console.log(loginCss);
  }
  render(){
    return(
      <div className="loginBlock">
        <h3>Please log in</h3>
        <form>
          <input type="text" name="login" placeholder="Enter your login or email" />
          <input type="password" name="password" placeholder="Enter your password" />
          <button type="submit">Sign up</button>
        </form>
      </div>
    )
  }
}
