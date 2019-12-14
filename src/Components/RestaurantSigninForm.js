import React from 'react';
import './App.css';

class LoginForm extends React.Component {
    constructor(props){
      super(props);
      this.state = {email: '', password: ''};
    }
  
    handleChange = (event) => {
      this.setState({[event.target.name]:event.target.value});
    }
  
    handleSubmit = (event) => {
      alert(this.state.email + " " + this.state.password);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            email:
            <input type="text" name="email" value={this.state.value} onChange={this.handleChange} />
          </label>
          <label>
            password:
            <input type="text" name="password" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Accedi"/>
        </form>
      );//fare log in per persone non registrate
    }
  }