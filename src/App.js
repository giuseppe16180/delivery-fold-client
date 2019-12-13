import React from 'react';
import logo from './logo.svg';
import './App.css';

var ConnectorFactory = (function(){
  function ConnectorClass() {  }
  var instance;
  return {
    getInstance: function(){
      // check if instance is available
      if (!instance) {
        instance = new ConnectorClass();
        delete instance.constructor; // or set it to null
      }
      return instance;
    }
  };
})();

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
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

function App() {
  return <LoginForm></LoginForm>
}

export default App;
