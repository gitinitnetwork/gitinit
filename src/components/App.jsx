import React from 'react';
import { Redirect } from 'react-router';
import { HashRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login.jsx';
import Home from './Home.jsx';

const App = (props) => {
  return (
    <div>
      <h1>Hi Will</h1>
      {/* <Home sampleUsers={props.sampleUsers}/>
      <Login /> */}
    </div>
  );
};

const mapStateToProps = (store) => ({
  sampleUsers: store.matches.sampleUsers
})

const mapDispatchToProps = () => {};

export default connect (mapStateToProps, mapDispatchToProps)(App);
