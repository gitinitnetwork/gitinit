import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login.jsx';
import Home from './Home.jsx';
import * as actions from '../actions/actions'



const mapStateToProps = (store) => ({
  sampleUsers: store.matches.sampleUsers
})

const mapDispatchToProps = dispatch => ({
  displayUsers: users => dispatch(actions.displayUsers(users))
});

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    fetch('/getAllUsers')
    .then(res => res.json())
    .then(data => {
      console.log('dddat data', data)
      console.log('display', this.props)
      this.props.displayUsers(data.rows)
    })
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
