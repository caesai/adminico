import React from 'react';
import * as styles from '../scss/LoginView.scss';
import {checkHttpStatus, parseJSON} from '../utils';

export default class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.signUp = this.signUp.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  signUp(){
    return fetch('http://localhost:3000/login', {
      method: 'post',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
          body: JSON.stringify({email: this.state.email, password: this.state.password})
      })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        if (response.access == 'granted') {
          console.log('granted');
        }
    });
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
