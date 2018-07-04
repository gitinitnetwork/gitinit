import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { HashRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
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

const mapStateToProps = (store) => ({
  sampleUsers: store.matches.sampleUsers
})

const mapDispatchToProps = () => {};

export default connect (mapStateToProps, mapDispatchToProps)(App);
