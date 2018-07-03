import React from 'react';
import { Redirect } from 'react-router';
import { HashRouter, Route, Link } from 'react-router-dom';
import Login from './Login.jsx';
import Home from './Home.jsx';

const App = () => {
  return (
    <h1>Hello</h1>
    <Link to="/"><Login /></Link>
  );
};

export default App;
