import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

const Home = () => {

  return (
    <div id="login-container">
      <button type="button"><a href="https://github.com/login/oauth/authorize?client_id=d337730ee82c0f67d053&scope=user">Log in with Github</a></button>
    </div>
  );
};




export default Home;
