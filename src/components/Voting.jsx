import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../assets/git-init-logo.png';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  userLogin: store.matches.userLogin,
  pendingUsers: store.matches.pendingUsers,
  currentPending: store.matches.currentPending,
});

const mapDispatchToProps = dispatch => ({
  displayUsers: users => dispatch(actions.displayUsers(users)),
  gitIgnore: index => dispatch(actions.gitIgnore(index)),
  gitCommit: index => dispatch(actions.gitCommit(index)),
});

class Voting extends Component {
  constructor(props) {
    super(props);
    this.handleIgnore = this.handleIgnore.bind(this);
    this.handleCommit = this.handleCommit.bind(this);
  }

  handleIgnore() {
    // make fetch request to add status of current swipe to DB
    fetch('/swipe', {
      method: 'POST',
      body: JSON.stringify({ mylogin: this.props.userLogin, theirlogin: this.props.pendingUsers[this.props.currentPending].login, vote: false }),
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((users) => { this.props.displayUsers(users); });

    // splice current pending from pending users array and re-display
    const ignore = new Promise((resolve, reject) => {
      resolve(this.props.gitIgnore(this.props.currentPending))
    })
      .then(() => {
        this.props.displayUsers(this.props.pendingUsers);
      });
  }

  handleCommit() {
    // make fetch request to add status of current swipe to DB
    fetch('/swipe', {
      method: 'POST',
      body: JSON.stringify({ mylogin: this.props.userLogin, theirlogin: this.props.pendingUsers[this.props.currentPending].login, vote: true }),
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((users) => {
        this.props.displayUsers(users);
      });

    // splice current pending from pending users array and re-display
    const commit = new Promise((resolve, reject) => {
      resolve(this.props.gitCommit(this.props.currentPending))
    })
      .then(() => {
        this.props.displayUsers(this.props.pendingUsers);
      });
  }

  render() {
    if (!this.props.pendingUsers[0]) {
      return <div><h3>Loading Matches...</h3></div>;
    }
    console.log('random', this.props.currentPending);
    console.log('pending at current', this.props.pendingUsers[this.props.currentPending]);
    // const avatar_urls = this.props.pendingUsers.map(user => user.avatar_url);
    return (
      <div id="voting-container">
        <div id="route-buttons">
          <Link to="/settings"><div className="settings-link"><button className="buttons"><i className="fas fa-cog fa-2x" /></button></div></Link>
          <Link to="/matches"><div className="matches-link"><button className="buttons"><i className="fas fa-comments fa-2x" /></button></div></Link>
        </div>
        <img id="homePic" src={this.props.pendingUsers[this.props.currentPending].avatar_url} alt="Avatar pending" />
        <div className="pending-info">
          <h4>User: {this.props.pendingUsers[this.props.currentPending].login}</h4>
          <h4>Followers: {this.props.pendingUsers[this.props.currentPending].followers}</h4>
        </div>
        <div id="voting-buttons">
          <button type="button" className="buttons" id="ignore" onClick={this.handleIgnore}>Git Ignore</button>
          <button type="button" className="buttons" id="commit" onClick={this.handleCommit}>Git Commit</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Voting);
