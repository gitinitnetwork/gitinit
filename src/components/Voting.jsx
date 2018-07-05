import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
    super(props)
    this.handleIgnore = this.handleIgnore.bind(this);
  }

  handleIgnore() {
    // make fetch request to add status of current swipe to DB
    fetch('/matches', {
      method: 'POST',
      body: { vote: false },
    })
    .then(res => res.json())
    .then(users => { this.props.displayUsers(users); });

    // splice current pending from pending users array and re-display
    new Promise((resolve, reject) => {
      resolve(this.props.gitIgnore(this.props.currentPending))
    })
    .then(() => {this.props.displayUsers(this.props.pendingUsers)});
  }
  
  handleCommit() {
    // make fetch request to add status of current swipe to DB
    fetch('/matches', {
      method: 'POST',
      body: { vote: true },
    })
    .then(res => res.json())
    .then(users => { 
      this.props.displayUsers(users); 
    });

    // splice current pending from pending users array and re-display
    new Promise((resolve, reject) => {
      resolve(this.props.gitIgnore(this.props.currentPending))
    })
    .then(() => {this.props.displayUsers(this.props.pendingUsers)});
  }
  
  render() {
    console.log('random', this.props.currentPending)
    const avatar_urls = this.props.pendingUsers.map(user => user.avatar_url);
    return (
      <div id="voting-container">
        <div id="route-buttons">
          <Link to="/settings"><div className="settings-link"><button>Settings</button></div></Link>
          <Link to="/matches"><div className="matches-link"><button>Matches</button></div></Link>
        </div>
        <img id="homePic" src={avatar_urls[this.props.currentPending]} />
        <div id="voting-buttons">
          <button id="ignore" onClick={this.handleIgnore}>Git Ignore</button>
          <button id="commit" onClick={this.handleCommit}>Git Commit</button>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Voting);