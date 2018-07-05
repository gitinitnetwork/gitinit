import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login.jsx';
import Home from './Home.jsx';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  sampleUsers: store.matches.sampleUsers,
});

const mapDispatchToProps = dispatch => ({
  displayUsers: users => dispatch(actions.displayUsers(users)),
  setLogin: users => dispatch(actions.setLogin(users)),
});

class App extends Component {
  componentDidMount() {
    fetch('/getAllUsers')
      .then(res => res.json())
      .then((data) => {
        console.log('dddat data', data);
        console.log('display', this.props);
        this.props.displayUsers(data.rows);
      });
  }

  render() {
    if (document.cookie) {
      const cookies = document.cookie.split(' ');
      const parsedCookies = {};
      cookies.forEach((el) => {
        parsedCookies[el.split('=')[0]] = el.split('=')[1];
      });
      if (parsedCookies.login) {
        this.props.setLogin(parsedCookies.login);
        return <Home />;
      }
    }
    return (
      <div>
        <h1>Git Init!</h1>
        <Login />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
