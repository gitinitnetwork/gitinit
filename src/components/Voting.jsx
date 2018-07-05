import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = store => ({
  pendingUsers: store.matches.pendingUsers
})

const Voting = (props) => {
  const random = Math.floor(Math.random() * props.pendingUsers.length);
  const avatar_urls = props.pendingUsers.map(user => user.avatar_url);
  console.log('av', avatar_urls)
  return (
    <div id="voting-container">
      <div id="route-buttons">
        <Link to="/settings"><div className="settings-link"><button>Settings</button></div></Link>
        <Link to="/matches"><div className="matches-link"><button>Matches</button></div></Link>
      </div>
      <img id="homePic" src={avatar_urls[random]} />
      <div id="voting-buttons">
        <button id="ignore">Git Ignore</button>
        <button id="commit">Git Commit</button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Voting);