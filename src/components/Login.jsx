import React from 'react';

const Login = () => {
  return (
    <div id="login-container">
      <button type="button"><a href="https://github.com/login/oauth/authorize?client_id=d337730ee82c0f67d053&scope=user" target="_blank" rel="noopener noreferrer">Log in with Github</a></button>
    </div>
  );
};

export default Login;
