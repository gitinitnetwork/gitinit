import React from 'react';
import logo from '../../assets/git-init-logo.png';

const Login = () => {
  return (
    <div>
      <img src={logo} width="200" />
      <button id="login-button" type="button"><a href="https://github.com/login/oauth/authorize?client_id=d337730ee82c0f67d053&scope=user">Log in with Github</a></button>
    </div>
  );
};

export default Login;
