import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { }
import './styles.css';
import App from './components/App.jsx';
import store from './store'

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);
