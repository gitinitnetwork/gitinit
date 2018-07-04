import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { HashRouter, Route, Link } from 'react-router-dom';
import Login from './Login.jsx';
import Home from './Home.jsx';



class App extends Component {
  componentDidMount() {
    console.log(document.cookie)
  }
  render() {
    if (document.cookie) {
      return <Home /> 
    } else {
      return (
          <div>
          <h1>Hi Will</h1>
          <Login />
        </div>
      );
    }
  }
};

export default App;
